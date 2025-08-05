// app/api/parties/first/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/app/config/db'

export async function GET() {
  try {
    const firstParty = await prisma.party.findFirst({
      orderBy: {
        id: 'asc' // or any other field you want to order by
      }
    })

    if (!firstParty) {
      return NextResponse.json(
        { error: 'No parties found' },
        { status: 404 }
      )
    }

    return NextResponse.json(firstParty)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch first party' },
      { status: 500 }
    )
  }
}