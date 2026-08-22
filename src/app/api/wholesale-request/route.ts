import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/rbac';
import { normalizeUzPhone, isValidUzPhone } from '@/lib/utils/phone';
import { extractUtmParams } from '@/lib/utils/utm';
import { WholesaleStatus, CustomerType } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

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

    const utmParams = extractUtmParams(body);

    const wholesaleReq = await db.wholesaleRequest.create({
      data: {
        userId: currentUser?.id || null,
        name: name.trim(),
        phone: normalizedPhone,
        companyName: companyName.trim(),
        businessType: businessType && Object.values(CustomerType).includes(businessType) ? businessType : CustomerType.MANUFACTURER,
        region: region.trim(),
        city: city.trim(),
        monthlyPurchaseRange: monthlyPurchaseRange ? monthlyPurchaseRange.trim() : null,
        notes: notes ? notes.trim() : null,
        status: WholesaleStatus.NEW,
        ...utmParams,
      },
    });

    return NextResponse.json({ success: true, id: wholesaleReq.id });
  } catch (error: any) {
    console.error('Wholesale request error:', error);
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create wholesale request' } }, { status: 500 });
  }
}
