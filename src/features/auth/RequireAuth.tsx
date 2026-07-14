import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AppShellSkeleton } from '../../components/Skeleton'
import { useAuth } from './AuthProvider'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  if (loading) {
    return <AppShellSkeleton />
  }

  if (!configured) {
    return (
      <main className="mx-auto flex min-h-svh max-w-lg flex-col justify-center px-6">
        <h1 className="font-display text-2xl font-bold text-ink">Config needed</h1>
        <p className="mt-3 text-muted">
          Set VITE_FIREBASE_* in web/.env, then restart the Vite server.
        </p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
