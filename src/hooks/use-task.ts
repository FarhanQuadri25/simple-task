// lib/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

// Define types based on your Prisma model
type Priority = 'HIGH' | 'NORMAL' | 'LOW'
type NotifyMethod = 'SMS' | 'WA' | 'EMAIL'

export interface Party {
    id: string
    firstName: string
    secondName: string
    mobile1: string
    mobile2: string | null
    email: string
    address: string
    status: string
    type: string
}

export interface Task {
    id: string
    jobDescription: string
    priority: Priority
    notifyVia: NotifyMethod
    partyId: string
    party: Party
    createdAt: string;
}

interface CreateTaskData {
    jobDescription: string
    priority: Priority
    notifyVia: NotifyMethod
    partyId: string
}

export const useTasks = () => {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await api.get('tasks').json<Task[]>()
            return response
        }
    })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (taskData: CreateTaskData) => {
            const response = await api.post('tasks', { json: taskData }).json<Task>()
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (taskId: string) => {
            const response = await api.delete(`tasks/${taskId}`).json<{ success: boolean }>()
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })
}