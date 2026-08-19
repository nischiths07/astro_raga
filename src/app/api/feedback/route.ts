import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { sanitizeText, isValidEmail } from '@/lib/security';

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Protection (Anti-Spam / Anti-Flooding)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`feedback:${clientIp}`, { windowSeconds: 600, maxRequests: 6 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many feedback requests. Please wait a few minutes before submitting again.' },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) }
        }
      );
    }

    // 2. Input Sanitization & Strict Length Validation
    const body = await request.json();
    const message = sanitizeText(body.message, 2000);
    const rawEmail = sanitizeText(body.email, 100);
    const email = (rawEmail && isValidEmail(rawEmail)) ? rawEmail : null;

    if (!message || message.length < 3) {
      return NextResponse.json({ success: false, error: 'A valid feedback message is required' }, { status: 400 });
    }

    // 3. Save to Database via Prisma
    let savedEntry = null;
    try {
      savedEntry = await prisma.feedback.create({
        data: {
          email,
          message,
        },
      });
    } catch (dbErr) {
      console.error('Non-fatal: Error saving feedback to database:', dbErr);
    }

    // 4. Dispatch notification if configured
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'AstroRaga-Feedback-Service/1.0'
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            to: 'snischith07@gmail.com',
            subject: 'New AstroRaga App Feedback / Suggestion',
            from_name: 'AstroRaga User Feedback',
            replyto: email || 'noreply@astroraga.com',
            message: `User Feedback received:\n\n${message}\n\nUser Contact Email: ${email || 'Not provided'}`
          })
        });
      } catch (emailErr) {
        console.error('Non-fatal: Error sending email notification:', emailErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback submitted successfully!',
      id: savedEntry?.id || null 
    });
  } catch (error) {
    return NextResponse.json({ success: true, message: 'Feedback received.' });
  }
}
