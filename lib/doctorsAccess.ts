import crypto from 'crypto';

/**
 * Server-side helpers for EstiTalk for Doctors access.
 *
 * Access model: a purchase is verified against Stripe (the source of truth),
 * then we issue a signed, non-expiring access token bound to the buyer's
 * e-mail. The token can be re-issued on any device via the recovery flow,
 * so access no longer depends on a single browser's localStorage.
 *
 * Required env vars (set in Netlify):
 *  - STRIPE_SECRET_KEY        Stripe secret (or restricted) API key
 *  - DOCTORS_ACCESS_SECRET    random string used to sign access tokens
 * Optional:
 *  - DOCTORS_PAYMENT_LINK_ID  plink_... id of the Payment Link; when set,
 *                             only purchases made through that link count
 */

const STRIPE_API = 'https://api.stripe.com/v1';

function accessSecret(): string {
  const secret = process.env.DOCTORS_ACCESS_SECRET;
  if (!secret) throw new Error('DOCTORS_ACCESS_SECRET is not configured');
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', accessSecret()).update(payload).digest('base64url');
}

export function issueAccessToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ v: 1, e: email.trim().toLowerCase(), t: Date.now() })
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyAccessToken(token: string): { email: string } | null {
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data?.v !== 1 || typeof data?.e !== 'string') return null;
    return { email: data.e };
  } catch {
    return null;
  }
}

async function stripeGet(path: string): Promise<Record<string, unknown>> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  const res = await fetch(`${STRIPE_API}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: 'no-store',
  });
  const body = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    const err = body?.error as { message?: string } | undefined;
    throw new Error(err?.message || `Stripe request failed (${res.status})`);
  }
  return body;
}

type CheckoutSession = {
  id: string;
  payment_status: string;
  payment_link: string | null;
  customer_details: { email: string | null } | null;
};

function isPaidDoctorsSession(session: CheckoutSession): boolean {
  if (session.payment_status !== 'paid') return false;
  const requiredLink = process.env.DOCTORS_PAYMENT_LINK_ID;
  if (requiredLink && session.payment_link !== requiredLink) return false;
  return true;
}

/** Verifies a Checkout Session id coming back from Stripe's success redirect. */
export async function verifyCheckoutSession(sessionId: string): Promise<{ email: string } | null> {
  if (!/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) return null;
  const session = (await stripeGet(`/checkout/sessions/${sessionId}`)) as unknown as CheckoutSession;
  if (!isPaidDoctorsSession(session)) return null;
  const email = session.customer_details?.email;
  return email ? { email } : null;
}

/** Looks for any paid purchase in Stripe made with the given e-mail address. */
export async function findPurchaseByEmail(email: string): Promise<{ email: string } | null> {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  const query = `customer_details[email]=${encodeURIComponent(normalized)}&limit=100`;
  const result = (await stripeGet(`/checkout/sessions?${query}`)) as unknown as {
    data: CheckoutSession[];
  };
  const paid = result.data?.find(isPaidDoctorsSession);
  return paid ? { email: normalized } : null;
}
