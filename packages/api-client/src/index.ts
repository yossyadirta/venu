import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

declare var process: any;

export const apiClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export * from './types';
export * from './client';
