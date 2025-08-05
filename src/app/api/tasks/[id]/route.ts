// app/api/tasks/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/app/config/db'

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const { id } = await params;
    try {
        await prisma.task.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        )
    }
}