// lib/hooks/useFirstParty.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Define Party type based on your Prisma model
export type Party = {
    id: string;
    firstName: string;
    secondName: string;
    mobile1: string;
    mobile2: string | null;
    email: string;
    address: string;
    status: string;
    type: string;

};

export const useFirstParty = () => {
    return useQuery<Party>({
        queryKey: ['firstParty'],
        queryFn: async () => {
            const response = await api.get('parties/first').json<Party>();
            return response;
        },
        // Optional: Add query options
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
    });
};

export const useParties = () => {
    return useQuery<Party[]>({
        queryKey: ['parties'],
        queryFn: async () => {
            const response = await api.get('parties').json<Party[]>();
            return response;
        },
        // Optional: Add query options
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
    });
};