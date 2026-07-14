import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GitFork, Star } from 'lucide-react'
import { getDashboard } from '../lib/repopulse'

function formatRelative(iso: string | null) {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.round(diff / 3_600_000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

export function DashboardPage() {
  const dash = useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: async () => (await getDashboard()).data,
  })

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Dashboard</h1>
        <p className="mt-2 text-muted">Overview of your tracked GitHub repositories.</p>
      </header>

      {dash.isLoading && <p className="text-muted">Loading overview…</p>}
      {dash.isError && (
        <p className="text-sm text-red-600">Could not load dashboard. Is the API running?</p>
      )}

      {dash.data && (
        <>
          <dl className="grid gap-6 sm:grid-cols-3">
            <Stat label="Repositories" value={dash.data.repositoryCount} />
            <Stat label="Favorites" value={dash.data.favoriteCount} />
            <Stat
              label="Stars tracked"
              value={dash.data.totalStars.toLocaleString()}
              icon={<Star className="size-4 text-brand" aria-hidden />}
            />
          </dl>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">Recently synced</h2>
              <Link to="/app/repos" className="text-sm font-medium text-brand hover:underline">
                View all
              </Link>
            </div>
            {dash.data.recentlySynced.length === 0 ? (
              <p className="mt-4 text-sm text-muted">
                No repos yet.{' '}
                <Link to="/app/search" className="text-brand underline">
                  Search GitHub
                </Link>{' '}
                to save your first one.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
                {dash.data.recentlySynced.map((item) => {
                  const [owner, name] = item.fullName.split('/')
                  return (
                    <li key={item.id}>
                      <Link
                        to={`/app/repos/${owner}/${name}`}
                        className="flex items-center justify-between gap-4 py-3 transition hover:bg-white/60"
                      >
                        <span className="font-medium text-ink">{item.fullName}</span>
                        <span className="flex items-center gap-4 text-sm text-muted">
                          <span className="inline-flex items-center gap-1">
                            <Star className="size-3.5" aria-hidden />
                            {item.stars.toLocaleString()}
                          </span>
                          <span>{formatRelative(item.lastSyncedAt)}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          <section className="flex flex-wrap gap-3">
            <Link
              to="/app/search"
              className="inline-flex items-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Search repositories
            </Link>
            <Link
              to="/app/repos"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand/40"
            >
              <GitFork className="size-4 text-brand" aria-hidden />
              My repos
            </Link>
          </section>
        </>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number
  icon?: ReactNode
}) {
  return (
    <div className="border-l-2 border-brand/40 pl-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 font-display text-3xl font-bold text-ink">
        {icon}
        {value}
      </dd>
    </div>
  )
}
