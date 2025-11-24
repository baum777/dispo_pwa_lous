import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const message: string = body.message ?? '';
  const wantsReply: boolean = Boolean(body.wantsReply);
  const email: string = body.email ?? '';

  if (!message || message.length > 6000) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  if (wantsReply && (!email || !email.includes('@'))) {
    return NextResponse.json({ error: 'Valid email required when requesting reply' }, { status: 400 });
  }

  // TODO: Persist to FileMaker layout "Feedback_Web"
  // TODO: Optionally send email notification to feedback inbox

  return NextResponse.json({ success: true });
}
