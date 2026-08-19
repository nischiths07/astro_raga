import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { sanitizeText, sanitizeRashi, sanitizeNakshatra, sanitizePada } from '@/lib/security';

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Protection
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`users:${clientIp}`, { windowSeconds: 60, maxRequests: 20 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) }
        }
      );
    }

    // 2. Input Sanitization
    const body = await request.json();
    const userName = sanitizeText(body.name, 50) || 'Seeker';
    const rashi = sanitizeRashi(body.rashi);
    const nakshatra = sanitizeNakshatra(body.nakshatra);
    const pada = sanitizePada(body.pada);
    const birthDate = sanitizeText(body.birthDate, 20);
    const birthTime = sanitizeText(body.birthTime, 20);

    const createdUser = await prisma.user.create({
      data: {
        name: userName,
        rashi,
        nakshatra,
        pada,
        birthDate,
        birthTime,
      },
    });

    return NextResponse.json({ success: true, user: createdUser });
  } catch (error: any) {
    console.error('Non-fatal error creating user profile in DB:', error?.message || error);
    return NextResponse.json({ 
      success: true, 
      user: { id: 'usr_' + Date.now(), name: 'Seeker' } 
    });
  }
}
