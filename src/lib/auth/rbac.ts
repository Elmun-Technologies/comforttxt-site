import { Role } from '@prisma/client';
import { db } from '@/lib/db';
import { createClient as createServerSupabaseClient } from '@/lib/supabase/server';

export interface AuthUser {
  id: string;
  authUserId: string | null;
  email: string;
  phone: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  b2bApproved: boolean;
  isActive: boolean;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
      return null;
    }

    const user = await db.user.findFirst({
      where: {
        OR: [
          { authUserId: session.user.id },
          { email: session.user.email || '' },
        ],
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    // Ensure authUserId is synchronized if found via email
    if (!user.authUserId && session.user.id) {
      await db.user.update({
        where: { id: user.id },
        data: { authUserId: session.user.id },
      });
    }

    return {
      id: user.id,
      authUserId: user.authUserId,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      b2bApproved: user.b2bApproved,
      isActive: user.isActive,
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

export async function requireRole(allowedRoles: Role[]): Promise<AuthUser> {
  const user = await requireUser();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('FORBIDDEN');
  }
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  return requireRole([Role.ADMIN, Role.SUPER_ADMIN]);
}

export async function requireStaff(): Promise<AuthUser> {
  return requireRole([Role.MANAGER, Role.CONTENT_MANAGER, Role.ADMIN, Role.SUPER_ADMIN]);
}
