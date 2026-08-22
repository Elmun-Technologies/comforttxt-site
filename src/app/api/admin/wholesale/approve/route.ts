import { NextRequest, NextResponse } from 'next/server';
import { db, type TransactionClient } from '@/lib/db';
import { requireAdmin } from '@/lib/auth/rbac';
import { WholesaleStatus, Role } from '@/lib/enums';

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { requestId, action } = await req.json();

    if (!requestId || !action || !['approved', 'rejected', 'contacted'].includes(action)) {
      return NextResponse.json({ error: { code: 'INVALID_PARAMS', message: 'Valid requestId and action are required' } }, { status: 400 });
    }

    const targetStatus = action === 'approved'
      ? WholesaleStatus.APPROVED
      : action === 'rejected'
      ? WholesaleStatus.REJECTED
      : WholesaleStatus.CONTACTED;

    const result = await db.$transaction(async (tx: TransactionClient) => {
      const wholesaleReq = await tx.wholesaleRequest.update({
        where: { id: requestId },
        data: { status: targetStatus },
      });

      if (targetStatus === WholesaleStatus.APPROVED && wholesaleReq.userId) {
        await tx.user.update({
          where: { id: wholesaleReq.userId },
          data: {
            role: Role.B2B_CUSTOMER,
            b2bApproved: true,
            b2bDiscount: 15.0,
          },
        });
      }

      await tx.auditLog.create({
        data: {
          actorId: admin.id,
          action: `WHOLESALE_REQUEST_${action.toUpperCase()}`,
          entityType: 'WHOLESALE_REQUEST',
          entityId: requestId,
          metadata: JSON.stringify({ status: targetStatus, userId: wholesaleReq.userId }),
        },
      });

      return wholesaleReq;
    });

    return NextResponse.json({ success: true, wholesaleRequest: result });
  } catch (error: any) {
    console.error('Wholesale approval error:', error);
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: { code: error.message, message: 'Access denied' } }, { status: 403 });
    }
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to process wholesale request action' } }, { status: 500 });
  }
}
