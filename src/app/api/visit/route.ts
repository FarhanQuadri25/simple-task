// app/api/visit/route.ts
import prisma from '@/app/config/db';
import { NextResponse } from 'next/server';



// GET: Return current visit count
export async function GET() {
    try {
        let visit = await prisma.visit.findFirst();

        if (!visit) {
            // Create initial record if not exists
            visit = await prisma.visit.create({
                data: { count: 1 },
            });
        }

        return NextResponse.json({ count: visit.count });
    } catch (error) {
        console.error('GET /api/visit error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

// POST: Increment visit count
export async function POST() {
    try {
        let visit = await prisma.visit.findFirst();

        if (!visit) {
            visit = await prisma.visit.create({
                data: { count: 1 },
            });
        } else {
            visit = await prisma.visit.update({
                where: { id: visit.id },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            });
        }

        return NextResponse.json({ count: visit.count });
    } catch (error) {
        console.error('POST /api/visit error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
