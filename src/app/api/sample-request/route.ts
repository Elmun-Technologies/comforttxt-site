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
      selectedFabrics,
      comment,
    } = body;

    if (!name || !phone || !selectedFabrics) {
      return NextResponse.json({ error: { code: 'MISSING_FIELDS', message: 'Name, phone, and selected fabrics are required' } }, { status: 400 });
    }

    const normalizedPhone = normalizeUzPhone(phone);
    if (!isValidUzPhone(normalizedPhone)) {
      return NextResponse.json({ error: { code: 'INVALID_PHONE_FORMAT', message: 'Valid Uzbekistan phone number is required' } }, { status: 400 });
    }

    const result = await storefrontService.submitSampleRequest({
      type: 'SAMPLE_REQUEST',
      name: name.trim(),
      phone: normalizedPhone,
      companyName: companyName ? companyName.trim() : undefined,
      businessType,
      region: region.trim(),
      city: city.trim(),
      notes: comment ? comment.trim() : undefined,
      requestedCollections: Array.isArray(selectedFabrics) ? selectedFabrics : [selectedFabrics],
    });

    return NextResponse.json({ success: result.success, id: result.referenceId, message: result.message });
  } catch (error: any) {
    console.error('Sample request error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create sample request' } }, { status: 500 });
  }
}
