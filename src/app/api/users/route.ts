import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rashi, nakshatra, pada, birthDate, birthTime } = body;

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        name,
        rashi,
        nakshatra,
        pada,
        birthDate,
        birthTime,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
  }
}
