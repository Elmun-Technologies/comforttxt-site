import { NextRequest, NextResponse } from 'next/server';
import { storefrontService } from '@/services/storefront';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      companyName,
      businessType,
      region = 'Toshkent',
      city = 'Toshkent',
      monthlyPurchaseRange,
      notes,
    } = body;

    if (!name || !phone || !companyName) {
      return NextResponse.json({ error: { code: 'MISSING_FIELDS', message: 'Name, phone, and company name are required' } }, { status: 400 });
    }

    const normalizedPhone = normalizeUzPhone(phone);
    if (!isValidUzPhone(normalizedPhone)) {
      return NextResponse.json({ error: { code: 'INVALID_PHONE_FORMAT', message: 'Valid Uzbekistan phone number is required' } }, { status: 400 });
    }

    const result = await storefrontService.submitWholesaleRequest({
      type: 'WHOLESALE_REQUEST',
      name: name.trim(),
      phone: normalizedPhone,
      companyName: companyName.trim(),
      businessType,
      region: region.trim(),
      city: city.trim(),
      notes: notes ? (monthlyPurchaseRange ? `[Hajm: ${monthlyPurchaseRange}] ${notes.trim()}` : notes.trim()) : monthlyPurchaseRange,
    });

    return NextResponse.json({ success: result.success, id: result.referenceId, message: result.message });
  } catch (error: any) {
    console.error('Wholesale request error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create wholesale request' } }, { status: 500 });
  }
}
