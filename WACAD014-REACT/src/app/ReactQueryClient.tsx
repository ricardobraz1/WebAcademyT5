'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const clienteQuery = new QueryClient()

export function ReactQueryWrapper({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={clienteQuery}>{children}</QueryClientProvider>
}