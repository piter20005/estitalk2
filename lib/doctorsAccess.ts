import crypto from 'node:crypto';

export const DOCTORS_COOKIE_NAME = 'doctors_access';
const DOCTORS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getSecret(): string | null {
  return process.env.DOCTORS_ACCESS_SECRET || null;
}

export function signDoctorsCookie(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload = { exp: Date.now() + DOCTORS_COOKIE_MAX_AGE * 1000 };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

export function verifyDoctorsCookie(cookie: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !cookie) return false;
  const parts = cookie.split('.');
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  const expected = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString()) as { exp?: number };
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export const DOCTORS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: DOCTORS_COOKIE_MAX_AGE,
};
