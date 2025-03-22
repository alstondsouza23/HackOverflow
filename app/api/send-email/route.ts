// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { sendUserIdEmail } from '@/lib/email-service';

export async function POST(request: Request) {
  const { email, userId } = await request.json();

  try {
    await sendUserIdEmail(email, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}