import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';
import { extractUtmParams } from '@/lib/utils/utm';
import { SampleStatus, CustomerType } from '@prisma/client';

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

    const utmParams = extractUtmParams(body);

    const sampleReq = await db.sampleRequest.create({
      data: {
        name: name.trim(),
        phone: normalizedPhone,
        companyName: companyName ? companyName.trim() : null,
        businessType: businessType && Object.values(CustomerType).includes(businessType) ? businessType : null,
        region: region.trim(),
        city: city.trim(),
        requestedCollections: typeof selectedFabrics === 'string' ? selectedFabrics : JSON.stringify(selectedFabrics),
        comment: comment ? comment.trim() : null,
        status: SampleStatus.NEW,
        ...utmParams,
      },
    });

    return NextResponse.json({ success: true, id: sampleReq.id });
  } catch (error: any) {
    console.error('Sample request error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create sample request' } }, { status: 500 });
  }
}
