// app/api/tasks/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/config/db'


export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                party: true
            },
            orderBy: {
                priority: 'desc'
            }
        })
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const { jobDescription, priority, notifyVia, partyId } = await request.json()

        const task = await prisma.task.create({
            data: {
                jobDescription,
                priority,
                notifyVia,
                partyId
            }
        })

        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        )
    }
}