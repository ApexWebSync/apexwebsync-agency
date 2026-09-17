import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ApexWebSync@2026';
const SECRET_SALT = 'apexwebsync_admin_auth_salt_2026';

export function getExpectedToken(): string {
  return crypto
    .createHmac('sha256', SECRET_SALT)
    .update(ADMIN_PASSWORD)
    .digest('hex');
}

export async function verifyAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;
  if (!sessionToken) return false;

  const expected = getExpectedToken();
  return sessionToken === expected;
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
