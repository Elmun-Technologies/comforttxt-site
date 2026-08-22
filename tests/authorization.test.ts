import { describe, it, expect } from 'vitest';
import { Role } from '@prisma/client';

function isAllowed(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

function canUserAccessOrder(orderUserId: string | null, requestingUser: { id: string; role: Role }): boolean {
  if (isAllowed(requestingUser.role, [Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER, Role.CONTENT_MANAGER])) {
    return true;
  }
  return orderUserId !== null && orderUserId === requestingUser.id;
}

describe('RBAC & IDOR Authorization Policy Tests', () => {
  it('should restrict admin route access to ADMIN and SUPER_ADMIN roles', () => {
    const adminRoles = [Role.ADMIN, Role.SUPER_ADMIN];

    expect(isAllowed(Role.SUPER_ADMIN, adminRoles)).toBe(true);
    expect(isAllowed(Role.ADMIN, adminRoles)).toBe(true);
    expect(isAllowed(Role.MANAGER, adminRoles)).toBe(false);
    expect(isAllowed(Role.B2B_CUSTOMER, adminRoles)).toBe(false);
    expect(isAllowed(Role.CUSTOMER, adminRoles)).toBe(false);
  });

  it('should allow users to access only their own orders (IDOR prevention)', () => {
    const userA = { id: 'usr-1', role: Role.CUSTOMER };
    const userB = { id: 'usr-2', role: Role.CUSTOMER };
    const staff = { id: 'usr-admin', role: Role.ADMIN };

    const orderUserA = 'usr-1';

    expect(canUserAccessOrder(orderUserA, userA)).toBe(true);
    expect(canUserAccessOrder(orderUserA, userB)).toBe(false);
    expect(canUserAccessOrder(orderUserA, staff)).toBe(true);
  });
});
