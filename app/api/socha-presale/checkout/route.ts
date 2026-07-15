import { NextRequest, NextResponse } from 'next/server';
import { SOCHA_PRESALE } from '@/lib/sochaPresale';

const STRIPE_CHECKOUT_SESSIONS_URL = 'https://api.stripe.com/v1/checkout/sessions';

function redirectToStatus(request: NextRequest, status: string) {
  return NextResponse.redirect(new URL(`${SOCHA_PRESALE.route}?status=${status}`, request.url), 303);
}

export async function POST(request: NextRequest) {
  const requestOrigin = request.headers.get('origin');
  const ownOrigin = new URL(request.url).origin;

  if (requestOrigin && requestOrigin !== ownOrigin) {
    return new NextResponse('Niedozwolone żądanie.', { status: 403 });
  }

  const formData = await request.formData();
  if (formData.get('terms') !== 'accepted') {
    return redirectToStatus(request, 'terms');
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('SOCHA_PRESALE: Missing STRIPE_SECRET_KEY.');
    return redirectToStatus(request, 'unavailable');
  }

  const successUrl = new URL(
    `${SOCHA_PRESALE.route}?status=success&session_id={CHECKOUT_SESSION_ID}`,
    request.url
  ).toString();
  const cancelUrl = new URL(`${SOCHA_PRESALE.route}?status=cancelled`, request.url).toString();

  const body = new URLSearchParams({
    mode: 'payment',
    locale: 'pl',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_creation: 'always',
    billing_address_collection: 'auto',
    'invoice_creation[enabled]': 'true',
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': SOCHA_PRESALE.currency,
    'line_items[0][price_data][unit_amount]': String(SOCHA_PRESALE.unitAmount),
    'line_items[0][price_data][tax_behavior]': 'inclusive',
    'line_items[0][price_data][product_data][name]': SOCHA_PRESALE.name,
    'line_items[0][price_data][product_data][description]':
      'Przedsprzedaż dostępu do dwóch płatnych części rozmowy EstiTalk. Informację o premierze wyślemy e-mailem.',
    'metadata[product_id]': SOCHA_PRESALE.productId,
    'metadata[presale]': 'true',
    'metadata[terms_accepted]': 'true',
    'metadata[terms_version]': '2026-07-15',
    'custom_text[submit][message]':
      'To przedsprzedaż. Informację o terminie premiery i sposobie dostępu wyślemy na adres e-mail podany podczas płatności.',
  });

  try {
    const stripeResponse = await fetch(STRIPE_CHECKOUT_SESSIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      cache: 'no-store',
    });

    if (!stripeResponse.ok) {
      const errorBody = await stripeResponse.text();
      console.error(`SOCHA_PRESALE: Stripe returned ${stripeResponse.status}: ${errorBody}`);
      return redirectToStatus(request, 'error');
    }

    const session = (await stripeResponse.json()) as { url?: string | null };
    if (!session.url) {
      console.error('SOCHA_PRESALE: Stripe Checkout Session has no URL.');
      return redirectToStatus(request, 'error');
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('SOCHA_PRESALE: Could not create Stripe Checkout Session.', error);
    return redirectToStatus(request, 'error');
  }
}

