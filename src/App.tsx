import { Activity } from 'lucide-react'

export default function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="font-display text-sm font-semibold tracking-wide text-brand uppercase">
        RepoPulse
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Track GitHub repos from your own API
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Search, save, and chart repository stats backed by Firestore.
      </p>
      <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
        <Activity className="size-4 text-brand" aria-hidden />
        NestJS API · React dashboard
      </div>
    </main>
  )
}
