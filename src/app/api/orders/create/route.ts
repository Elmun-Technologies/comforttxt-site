import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/rbac';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';
import { extractUtmParams } from '@/lib/utils/utm';
import { OrderStatus, PaymentMethod, PaymentStatus, DeliveryMethod, MovementType, UnitType } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    const {
      guestName,
      guestPhone,
      guestEmail,
      deliveryMethod = DeliveryMethod.COURIER,
      deliveryRegion,
      deliveryCity,
      deliveryAddress,
      paymentMethod = PaymentMethod.CASH,
      comment,
      items,
      idempotencyKey,
    } = body;

    // 1. Validation
    if (!guestName || typeof guestName !== 'string' || !guestName.trim()) {
      return NextResponse.json({ error: { code: 'INVALID_NAME', message: 'Name is required' } }, { status: 400 });
    }

    if (!guestPhone || typeof guestPhone !== 'string') {
      return NextResponse.json({ error: { code: 'INVALID_PHONE', message: 'Phone number is required' } }, { status: 400 });
    }

    const normalizedPhone = normalizeUzPhone(guestPhone);
    if (!isValidUzPhone(normalizedPhone)) {
      return NextResponse.json({ error: { code: 'INVALID_PHONE_FORMAT', message: 'Valid Uzbekistan phone number is required (+998XXXXXXXXX)' } }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: { code: 'EMPTY_CART', message: 'Cart items are required' } }, { status: 400 });
    }

    // 2. Idempotency Check
    if (idempotencyKey && typeof idempotencyKey === 'string') {
      const existingOrder = await db.order.findUnique({
        where: { idempotencyKey },
        select: { id: true, orderNumber: true, total: true },
      });
      if (existingOrder) {
        return NextResponse.json({
          success: true,
          idempotent: true,
          orderId: existingOrder.id,
          orderNumber: existingOrder.orderNumber,
          total: existingOrder.total,
        });
      }
    }

    const utmParams = extractUtmParams(body);

    // 3. Process Transaction
    const result = await db.$transaction(async (tx) => {
      let subtotal = 0;
      const orderItemsSnapshots = [];

      for (const item of items) {
        const { variantId, quantity: rawQty } = item;
        const qty = parseFloat(rawQty);

        if (isNaN(qty) || qty <= 0) {
          throw new Error(`INVALID_QUANTITY: Invalid quantity for item ${variantId}`);
        }

        // Fetch Variant, Product, Price & Inventory with row-level integrity
        const variant = await tx.productVariant.findUnique({
          where: { id: variantId },
          include: {
            product: true,
            price: true,
            inventory: true,
          },
        });

        if (!variant || !variant.isActive || !variant.product.isActive) {
          throw new Error(`PRODUCT_UNAVAILABLE: Variant SKU ${variant?.sku || variantId} is unavailable`);
        }

        // Check Quantity Step
        const step = Number(variant.quantityStep);
        if (step > 0 && Math.abs((qty % step)) > 0.001 && Math.abs(step - (qty % step)) > 0.001) {
          throw new Error(`INVALID_QTY_STEP: Quantity for ${variant.sku} must be in increments of ${step}`);
        }

        // Check Stock
        const inventory = variant.inventory;
        if (!inventory) {
          throw new Error(`STOCK_ERROR: No inventory record for variant ${variant.sku}`);
        }

        const onHand = Number(inventory.onHand);
        const reserved = Number(inventory.reserved);
        const available = onHand - reserved;

        if (qty > available) {
          throw new Error(`INSUFFICIENT_STOCK: Requested ${qty} for ${variant.sku}, but only ${available} available`);
        }

        // Determine Authoritative Price (B2B discount if user is approved B2B)
        const basePrice = (currentUser?.role === 'B2B_CUSTOMER' && currentUser?.b2bApproved && variant.price?.wholesalePrice)
          ? variant.price.wholesalePrice
          : variant.price?.retailPrice ?? 0;

        const lineSubtotal = Math.round(basePrice * qty);
        subtotal += lineSubtotal;

        orderItemsSnapshots.push({
          productId: variant.productId,
          variantId: variant.id,
          productNameUz: variant.product.titleUz,
          productNameRu: variant.product.titleRu,
          sku: variant.sku,
          variantNameUz: variant.nameUz,
          variantNameRu: variant.nameRu,
          unitType: variant.product.unitType,
          unitPrice: basePrice,
          quantity: qty,
          lineSubtotal,
        });

        // Reserve Inventory
        const newReserved = reserved + qty;
        await tx.inventory.update({
          where: { id: inventory.id },
          data: {
            reserved: newReserved,
            status: (onHand - newReserved) <= 0 ? 'OUT_OF_STOCK' : (onHand - newReserved) <= 10 ? 'LOW_STOCK' : 'IN_STOCK',
          },
        });

        await tx.inventoryMovement.create({
          data: {
            inventoryId: inventory.id,
            type: MovementType.ORDER_RESERVATION,
            quantity: qty,
            reason: `Reservation for new order`,
            referenceType: 'ORDER',
            createdBy: currentUser?.id || 'GUEST',
          },
        });
      }

      // Generate Order Number: CT-YYMMDD-XXXXX
      const todayStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const orderNumber = `CT-${todayStr}-${randomSuffix}`;

      const deliveryAmount = deliveryMethod === DeliveryMethod.PICKUP ? 0 : 0; // Configurable tariff later
      const total = subtotal + deliveryAmount;

      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: currentUser?.id || null,
          guestName: guestName.trim(),
          guestPhone: normalizedPhone,
          guestEmail: guestEmail ? guestEmail.trim() : null,
          orderStatus: OrderStatus.NEW,
          paymentMethod,
          paymentStatus: PaymentStatus.PENDING,
          deliveryMethod,
          deliveryRegion,
          deliveryCity,
          deliveryAddress: deliveryAddress || 'Pickup',
          comment: comment ? comment.trim() : null,
          subtotal,
          deliveryAmount,
          discountAmount: 0,
          total,
          currency: 'UZS',
          locale: 'uz',
          idempotencyKey: idempotencyKey || null,
          ...utmParams,
          items: {
            create: orderItemsSnapshots,
          },
        },
      });

      return order;
    });

    return NextResponse.json({
      success: true,
      orderId: result.id,
      orderNumber: result.orderNumber,
      total: result.total,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    const message = error.message || 'Failed to create order';
    if (message.includes('INSUFFICIENT_STOCK') || message.includes('INVALID_QTY_STEP') || message.includes('PRODUCT_UNAVAILABLE')) {
      return NextResponse.json({ error: { code: 'VALIDATION_ERROR', message } }, { status: 400 });
    }
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to process order' } }, { status: 500 });
  }
}
