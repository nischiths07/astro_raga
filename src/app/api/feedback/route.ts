import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Feedback message is required' }, { status: 400 });
    }

    // 1. Save to local SQLite database via Prisma
    let savedEntry = null;
    try {
      if ((prisma as any).feedback) {
        savedEntry = await (prisma as any).feedback.create({
          data: {
            email: email || null,
            message: message.trim(),
          },
        });
      }
    } catch (dbErr) {
      console.error('Error saving feedback to database:', dbErr);
    }

    // 2. Dispatch email notification via public Web3Forms service targeting snischith07@gmail.com
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'b9d5c414-06c8-4770-9856-11f845700fa3', // Public Web3Forms key fallback
          to: 'snischith07@gmail.com',
          subject: 'New AstroRaga App Feedback / Suggestion',
          from_name: 'AstroRaga User Feedback',
          replyto: email || 'noreply@astroraga.com',
          message: `User Feedback received:\n\n${message.trim()}\n\nUser Contact Email: ${email || 'Not provided'}`
        })
      });
    } catch (emailErr) {
      console.error('Error sending email notification:', emailErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback submitted successfully!',
      id: savedEntry?.id || null 
    });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
