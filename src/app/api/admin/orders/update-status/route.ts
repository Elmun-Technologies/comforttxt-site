import { NextRequest, NextResponse } from 'next/server';
import { db, type TransactionClient } from '@/lib/db';
import { requireStaff } from '@/lib/auth/rbac';
import { OrderStatus, MovementType } from '@/lib/enums';

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  NEW: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  CONFIRMED: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
  PROCESSING: [OrderStatus.PACKED, OrderStatus.CANCELLED],
  PACKED: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  SHIPPED: [OrderStatus.DELIVERED],
  DELIVERED: [],
  CANCELLED: [],
};

export async function POST(req: NextRequest) {
  try {
    const admin = await requireStaff();
    const { orderId, orderStatus } = await req.json();

    if (!orderId || !orderStatus || !Object.values(OrderStatus).includes(orderStatus)) {
      return NextResponse.json({ error: { code: 'INVALID_PARAMS', message: 'Valid orderId and orderStatus are required' } }, { status: 400 });
    }

    const currentOrder = await db.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            variant: {
              include: { inventory: true },
            },
          },
        },
      },
    });

    if (!currentOrder) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Order not found' } }, { status: 404 });
    }

    const currentStatus = currentOrder.orderStatus as OrderStatus;
    const targetStatus = orderStatus as OrderStatus;

    if (currentStatus !== targetStatus && !ALLOWED_TRANSITIONS[currentStatus]?.includes(targetStatus) && admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({
        error: { code: 'INVALID_TRANSITION', message: `Cannot transition order status from ${currentStatus} to ${targetStatus}` },
      }, { status: 400 });
    }

    const updatedOrder = await db.$transaction(async (tx: TransactionClient) => {
      // Handle Inventory state changes
      if (targetStatus === OrderStatus.CANCELLED && currentStatus !== OrderStatus.CANCELLED) {
        // Release reservations
        for (const item of currentOrder.items) {
          if (item.variant && item.variant.inventory) {
            const inv = item.variant.inventory;
            const qty = Number(item.quantity);
            const newReserved = Math.max(0, Number(inv.reserved) - qty);

            await tx.inventory.update({
              where: { id: inv.id },
              data: { reserved: newReserved },
            });

            await tx.inventoryMovement.create({
              data: {
                inventoryId: inv.id,
                type: MovementType.ORDER_RELEASE,
                quantity: qty,
                reason: `Order ${currentOrder.orderNumber} cancelled`,
                referenceType: 'ORDER',
                referenceId: currentOrder.id,
                createdBy: admin.id,
              },
            });
          }
        }
      } else if ((targetStatus === OrderStatus.SHIPPED || targetStatus === OrderStatus.DELIVERED) && currentStatus !== OrderStatus.SHIPPED && currentStatus !== OrderStatus.DELIVERED) {
        // Fulfill stock: decrement both onHand and reserved
        for (const item of currentOrder.items) {
          if (item.variant && item.variant.inventory) {
            const inv = item.variant.inventory;
            const qty = Number(item.quantity);
            const newOnHand = Math.max(0, Number(inv.onHand) - qty);
            const newReserved = Math.max(0, Number(inv.reserved) - qty);

            await tx.inventory.update({
              where: { id: inv.id },
              data: {
                onHand: newOnHand,
                reserved: newReserved,
                status: newOnHand <= 0 ? 'OUT_OF_STOCK' : newOnHand <= 10 ? 'LOW_STOCK' : 'IN_STOCK',
              },
            });

            await tx.inventoryMovement.create({
              data: {
                inventoryId: inv.id,
                type: MovementType.ORDER_FULFILLMENT,
                quantity: qty,
                reason: `Order ${currentOrder.orderNumber} fulfilled (${targetStatus})`,
                referenceType: 'ORDER',
                referenceId: currentOrder.id,
                createdBy: admin.id,
              },
            });
          }
        }
      }

      const order = await tx.order.update({
        where: { id: orderId },
        data: { orderStatus: targetStatus },
      });

      // Audit Log
      await tx.auditLog.create({
        data: {
          actorId: admin.id,
          action: 'ORDER_STATUS_UPDATE',
          entityType: 'ORDER',
          entityId: orderId,
          metadata: JSON.stringify({ from: currentStatus, to: targetStatus, orderNumber: currentOrder.orderNumber }),
        },
      });

      return order;
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    console.error('Order status update error:', error);
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: { code: error.message, message: 'Access denied' } }, { status: 403 });
    }
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to update order status' } }, { status: 500 });
  }
}
