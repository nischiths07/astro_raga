import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rashi, nakshatra, pada, birthDate, birthTime } = body;

    const createdUser = await prisma.user.create({
      data: {
        name: name || 'Seeker',
        rashi: rashi || 'Mesha',
        nakshatra: nakshatra || 'Ashwini',
        pada: pada || '1',
        birthDate: birthDate || '',
        birthTime: birthTime || '',
      },
    });

    return NextResponse.json({ success: true, user: createdUser });
  } catch (error: any) {
    console.error('Error creating user profile in DB:', error?.message || error);
    return NextResponse.json({ 
      success: false,
      dbError: error?.message || String(error),
      user: { id: 'usr_' + Date.now(), name: name || 'Seeker' } 
    });
  }
}
