import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  DOCTORS_COOKIE_NAME,
  DOCTORS_COOKIE_OPTIONS,
  signDoctorsCookie,
} from '@/lib/doctorsAccess';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');
  const target = new URL('/for-doctors', url.origin);

  if (!sessionId) {
    target.searchParams.set('error', 'missing_session');
    return NextResponse.redirect(target);
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error('[doctors/grant] STRIPE_SECRET_KEY not configured');
    target.searchParams.set('error', 'config');
    return NextResponse.redirect(target);
  }

  let paid = false;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paid = session.payment_status === 'paid';
  } catch (err) {
    console.error('[doctors/grant] Stripe session retrieval failed:', err);
    target.searchParams.set('error', 'verify');
    return NextResponse.redirect(target);
  }

  if (!paid) {
    target.searchParams.set('error', 'unpaid');
    return NextResponse.redirect(target);
  }

  const signed = signDoctorsCookie();
  if (!signed) {
    console.error('[doctors/grant] DOCTORS_ACCESS_SECRET not configured');
    target.searchParams.set('error', 'config');
    return NextResponse.redirect(target);
  }

  target.searchParams.set('granted', '1');
  const response = NextResponse.redirect(target);
  response.cookies.set(DOCTORS_COOKIE_NAME, signed, DOCTORS_COOKIE_OPTIONS);
  return response;
}
