import { Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthProvider'

export function LandingPage() {
  const { user } = useAuth()

  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="animate-fade-in font-display text-sm font-semibold tracking-wide text-brand uppercase">
        RepoPulse
      </p>
      <h1 className="animate-fade-in font-display mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl [animation-delay:80ms]">
        Track GitHub repos from your own API
      </h1>
      <p className="animate-fade-in mt-4 max-w-xl text-lg text-muted [animation-delay:140ms]">
        Search, save, and chart repository stats backed by Firestore.
      </p>
      <div className="animate-fade-in mt-8 flex flex-wrap items-center gap-4 [animation-delay:200ms]">
        <Link
          to={user ? '/app' : '/login'}
          className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark hover:shadow-md hover:shadow-brand/20"
        >
          {user ? 'Open dashboard' : 'Sign in with Google'}
        </Link>
        <div className="inline-flex items-center gap-2 text-sm text-muted">
          <Activity className="size-4 text-brand" aria-hidden />
          NestJS API · React dashboard
        </div>
      </div>
    </main>
  )
}
