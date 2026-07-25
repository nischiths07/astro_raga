import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rashi, nakshatra, pada, birthDate, birthTime } = body;

    let userObj = {
      id: 'usr_' + Date.now(),
      name: name || 'Seeker',
      rashi: rashi || 'Mesha',
      nakshatra: nakshatra || 'Ashwini',
      pada: pada || '1',
      birthDate: birthDate || '',
      birthTime: birthTime || '',
    };

    // Attempt to persist user in SQLite DB if writable
    try {
      const createdUser = await prisma.user.create({
        data: {
          name: name || 'Seeker',
          rashi,
          nakshatra,
          pada,
          birthDate,
          birthTime,
        },
      });
      if (createdUser && createdUser.id) {
        userObj = createdUser as any;
      }
    } catch (dbError) {
      console.warn('SQLite DB write bypassed on serverless platform:', dbError);
    }

    return NextResponse.json({ success: true, user: userObj });
  } catch (error) {
    console.error('Error creating user profile:', error);
    // Fallback response so user creation is never blocked
    return NextResponse.json({ 
      success: true, 
      user: { id: 'usr_' + Date.now() } 
    });
  }
}
