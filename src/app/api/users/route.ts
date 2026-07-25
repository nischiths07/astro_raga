import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userName = body.name || 'Seeker';
    const rashi = body.rashi || 'Mesha';
    const nakshatra = body.nakshatra || 'Ashwini';
    const pada = body.pada || '1';
    const birthDate = body.birthDate || '';
    const birthTime = body.birthTime || '';

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
    console.error('Error creating user profile in DB:', error?.message || error);
    return NextResponse.json({ 
      success: false,
      dbError: error?.message || String(error),
      user: { id: 'usr_' + Date.now(), name: 'Seeker' } 
    });
  }
}
