import { NextResponse } from 'next/server';
import { findPurchaseByEmail, issueAccessToken } from '@/lib/doctorsAccess';

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  if (typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  try {
    const purchase = await findPurchaseByEmail(email);
    if (!purchase) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }
    return NextResponse.json({ token: issueAccessToken(purchase.email), email: purchase.email });
  } catch (error) {
    console.error('doctors-access/recover error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
