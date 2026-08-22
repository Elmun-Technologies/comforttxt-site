import { NextRequest, NextResponse } from 'next/server';
import { storefrontService } from '@/services/storefront';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      guestName,
      guestPhone,
      guestEmail,
      deliveryMethod = 'COURIER',
      deliveryRegion,
      deliveryCity,
      deliveryAddress,
      paymentMethod = 'CASH',
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

    // 2. Submit order through Storefront Service (Ready for ShopFlow)
    const result = await storefrontService.submitOrder({
      guestName: guestName.trim(),
      guestPhone: normalizedPhone,
      guestEmail: guestEmail ? guestEmail.trim() : undefined,
      deliveryMethod: deliveryMethod === 'PICKUP' ? 'PICKUP' : 'COURIER',
      deliveryRegion: deliveryRegion ? deliveryRegion.trim() : undefined,
      deliveryCity: deliveryCity ? deliveryCity.trim() : undefined,
      deliveryAddress: deliveryAddress ? deliveryAddress.trim() : 'Toshkent',
      paymentMethod: paymentMethod === 'BANK_TRANSFER' ? 'BANK_TRANSFER' : 'CASH',
      comment: comment ? comment.trim() : undefined,
      idempotencyKey: idempotencyKey || undefined,
      items: items.map((i: any) => ({
        productId: i.productId,
        variantId: i.variantId,
        sku: i.sku || 'SKU-UNKNOWN',
        quantity: parseFloat(i.quantity) || 1,
      })),
    });

    return NextResponse.json({
      success: result.success,
      orderId: result.orderId,
      orderNumber: result.orderNumber,
      total: result.total,
      message: result.message,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to process order' } }, { status: 500 });
  }
}
