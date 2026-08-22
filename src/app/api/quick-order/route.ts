import { NextRequest, NextResponse } from 'next/server';
import { storefrontService } from '@/services/storefront';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, sku, quantity, notes, productId, variantId } = body;

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

    const result = await storefrontService.submitQuickOrder({
      type: 'QUICK_ORDER',
      name: name.trim(),
      phone: normalizedPhone,
      sku,
      productId,
      variantId,
      quantity: quantity ? parseFloat(quantity) : 1.0,
      notes: notes ? notes.trim() : undefined,
    });

    return NextResponse.json({
      success: result.success,
      id: result.referenceId,
      message: result.message,
    });
  } catch (error: any) {
    console.error('Quick order creation error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create quick order request' } }, { status: 500 });
  }
}
