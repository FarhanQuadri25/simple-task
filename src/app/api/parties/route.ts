// app/api/parties/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/config/db';

export async function GET() {
  try {
    const parties = await prisma.party.findMany({
      orderBy: {
        firstName: 'asc'
      }
    });
    return NextResponse.json(parties);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch parties' },
      { status: 500 }
    );
  }
}