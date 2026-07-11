import { NextResponse } from 'next/server';
import { issueAccessToken, verifyCheckoutSession } from '@/lib/doctorsAccess';

export async function POST(request: Request) {
  let sessionId: unknown;
  try {
    ({ sessionId } = await request.json());
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  if (typeof sessionId !== 'string' || !sessionId) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  try {
    const purchase = await verifyCheckoutSession(sessionId);
    if (!purchase) {
      return NextResponse.json({ error: 'not_paid' }, { status: 403 });
    }
    return NextResponse.json({ token: issueAccessToken(purchase.email), email: purchase.email });
  } catch (error) {
    console.error('doctors-access/session error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
