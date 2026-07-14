import { Navigate, useLocation } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from './AuthProvider'

export function LoginPage() {
  const { signInWithGoogle, configured, loading, user } = useAuth()
  const location = useLocation()
  const from =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from: string }).from.startsWith('/app')
      ? (location.state as { from: string }).from
      : '/app'

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-6 py-16">
      <p className="font-display text-sm font-semibold tracking-wide text-brand uppercase">
        RepoPulse
      </p>
      <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink">
        Sign in
      </h1>
      <p className="mt-3 text-muted">
        Use Google to access your saved repositories and analytics.
      </p>

      {!configured && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Firebase web config is missing. Set VITE_FIREBASE_* in web/.env.
        </p>
      )}

      <button
        type="button"
        disabled={!configured || loading}
        onClick={() => void signInWithGoogle()}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogIn className="size-4" aria-hidden />
        Continue with Google
      </button>
    </main>
  )
}
