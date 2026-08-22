import { NextRequest, NextResponse } from 'next/server';
import { db, type TransactionClient } from '@/lib/db';
import { requireStaff } from '@/lib/auth/rbac';
import { MovementType } from '@/lib/enums';

export async function POST(req: NextRequest) {
  try {
    const admin = await requireStaff();
    const { variantId, stock, price, wholesalePrice, reason = 'Admin manual adjustment' } = await req.json();

    if (!variantId) {
      return NextResponse.json({ error: { code: 'MISSING_VARIANT', message: 'variantId is required' } }, { status: 400 });
    }

    const variant = await db.productVariant.findUnique({
      where: { id: variantId },
      include: { inventory: true, price: true },
    });

    if (!variant) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Variant not found' } }, { status: 404 });
    }

    const result = await db.$transaction(async (tx: TransactionClient) => {
      // 1. Update Stock & Record Movement if stock passed
      if (stock !== undefined && stock !== null) {
        const newStock = parseFloat(stock);
        if (isNaN(newStock) || newStock < 0) {
          throw new Error('Stock quantity must be a non-negative number');
        }

        const currentOnHand = variant.inventory ? Number(variant.inventory.onHand) : 0;
        const diff = newStock - currentOnHand;

        const updatedInv = await tx.inventory.upsert({
          where: { variantId },
          create: {
            variantId,
            onHand: newStock,
            reserved: 0,
            status: newStock <= 0 ? 'OUT_OF_STOCK' : newStock <= 10 ? 'LOW_STOCK' : 'IN_STOCK',
          },
          update: {
            onHand: newStock,
            status: newStock <= 0 ? 'OUT_OF_STOCK' : newStock <= 10 ? 'LOW_STOCK' : 'IN_STOCK',
          },
        });

        if (diff !== 0) {
          await tx.inventoryMovement.create({
            data: {
              inventoryId: updatedInv.id,
              type: diff > 0 ? MovementType.RECEIPT : MovementType.ADJUSTMENT,
              quantity: Math.abs(diff),
              reason: `${reason} (Adjustment: ${diff > 0 ? '+' : ''}${diff})`,
              referenceType: 'MANUAL_ADJUSTMENT',
              createdBy: admin.id,
            },
          });
        }
      }

      // 2. Update Prices if passed
      if (price !== undefined || wholesalePrice !== undefined) {
        const newRetail = price !== undefined ? Math.round(parseFloat(price)) : variant.price?.retailPrice ?? 0;
        const newWholesale = wholesalePrice !== undefined && wholesalePrice !== null ? Math.round(parseFloat(wholesalePrice)) : variant.price?.wholesalePrice;

        await tx.productPrice.upsert({
          where: { variantId },
          create: {
            variantId,
            retailPrice: newRetail,
            wholesalePrice: newWholesale,
          },
          update: {
            retailPrice: newRetail,
            wholesalePrice: newWholesale,
          },
        });
      }

      // Audit Log
      await tx.auditLog.create({
        data: {
          actorId: admin.id,
          action: 'STOCK_PRICE_UPDATE',
          entityType: 'PRODUCT_VARIANT',
          entityId: variantId,
          metadata: JSON.stringify({ stock, price, wholesalePrice, sku: variant.sku }),
        },
      });

      return tx.productVariant.findUnique({
        where: { id: variantId },
        include: { inventory: true, price: true },
      });
    });

    return NextResponse.json({ success: true, variant: result });
  } catch (error: any) {
    console.error('Update stock error:', error);
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: { code: error.message, message: 'Access denied' } }, { status: 403 });
    }
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to update stock' } }, { status: 500 });
  }
}
