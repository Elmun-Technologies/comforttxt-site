import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';
import { extractUtmParams } from '@/lib/utils/utm';
import { QuickOrderStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, sku, quantity, notes } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: { code: 'INVALID_NAME', message: 'Name is required' } }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: { code: 'INVALID_PHONE', message: 'Phone number is required' } }, { status: 400 });
    }

    const normalizedPhone = normalizeUzPhone(phone);
    if (!isValidUzPhone(normalizedPhone)) {
      return NextResponse.json({ error: { code: 'INVALID_PHONE_FORMAT', message: 'Valid Uzbekistan phone number is required' } }, { status: 400 });
    }

    let productId: string | undefined;
    let variantId: string | undefined;

    if (sku) {
      const variant = await db.productVariant.findUnique({
        where: { sku },
        select: { id: true, productId: true },
      });
      if (variant) {
        variantId = variant.id;
        productId = variant.productId;
      }
    }

    const utmParams = extractUtmParams(body);

    const quickOrder = await db.quickOrderRequest.create({
      data: {
        productId,
        variantId,
        name: name.trim(),
        phone: normalizedPhone,
        quantity: quantity ? parseFloat(quantity) : 1.0,
        notes: notes ? notes.trim() : null,
        status: QuickOrderStatus.NEW,
        ...utmParams,
      },
    });

    return NextResponse.json({
      success: true,
      id: quickOrder.id,
    });
  } catch (error: any) {
    console.error('Quick order creation error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create quick order request' } }, { status: 500 });
  }
}
