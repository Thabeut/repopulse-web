import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ExternalLink,
  GitFork,
  Heart,
  RefreshCw,
  Star,
  Trash2,
} from 'lucide-react'
import {
  CommitActivityChart,
  LanguagesChart,
} from '../features/charts/RepoCharts'
import { ChartSkeleton, RepoDetailSkeleton } from '../components/Skeleton'
import {
  deleteRepository,
  getCommitActivity,
  getLanguages,
  getRepositoryByFullName,
  refreshRepository,
  setFavorite,
} from '../lib/repopulse'

export function RepoDetailPage() {
  const { owner = '', name = '' } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const repo = useQuery({
    queryKey: ['repository', owner, name],
    enabled: Boolean(owner && name),
    queryFn: async () => (await getRepositoryByFullName(owner, name)).data,
  })

  const languages = useQuery({
    queryKey: ['languages', repo.data?.id],
    enabled: Boolean(repo.data?.id),
    queryFn: async () => (await getLanguages(repo.data!.id)).data,
  })

  const activity = useQuery({
    queryKey: ['commit-activity', repo.data?.id],
    enabled: Boolean(repo.data?.id),
    queryFn: async () => (await getCommitActivity(repo.data!.id)).data,
  })

  const refresh = useMutation({
    mutationFn: () => refreshRepository(repo.data!.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['repository', owner, name] })
      void queryClient.invalidateQueries({ queryKey: ['languages'] })
      void queryClient.invalidateQueries({ queryKey: ['commit-activity'] })
      void queryClient.invalidateQueries({ queryKey: ['repositories'] })
      void queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] })
    },
  })

  const favorite = useMutation({
    mutationFn: (favorited: boolean) => setFavorite(repo.data!.id, favorited),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['repository', owner, name] })
      void queryClient.invalidateQueries({ queryKey: ['repositories'] })
      void queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] })
    },
  })

  const remove = useMutation({
    mutationFn: () => deleteRepository(repo.data!.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['repositories'] })
      void queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] })
      navigate('/app/repos')
    },
  })

  if (repo.isLoading) {
    return <RepoDetailSkeleton />
  }

  if (repo.isError || !repo.data) {
    return (
      <div>
        <p className="text-red-600">Repository not found in your library.</p>
        <Link to="/app/search" className="mt-4 inline-block text-brand underline">
          Search to save it
        </Link>
      </div>
    )
  }

  const data = repo.data

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <img
                src={data.ownerAvatarUrl}
                alt=""
                className="size-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                  {data.fullName}
                </h1>
                <a
                  href={data.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-brand hover:underline"
                >
                  GitHub <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>
            {data.description && (
              <p className="mt-3 max-w-2xl text-muted">{data.description}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={refresh.isPending}
              onClick={() => refresh.mutate()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink transition hover:border-brand/40 disabled:opacity-60"
            >
              <RefreshCw
                className={`size-4 ${refresh.isPending ? 'animate-spin' : ''}`}
                aria-hidden
              />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => favorite.mutate(!data.favorited)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink transition hover:border-brand/40"
            >
              <Heart
                className={`size-4 ${data.favorited ? 'fill-brand text-brand' : ''}`}
                aria-hidden
              />
              {data.favorited ? 'Favorited' : 'Favorite'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Remove ${data.fullName}?`)) remove.mutate()
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-muted transition hover:border-red-200 hover:text-red-600"
            >
              <Trash2 className="size-4" aria-hidden />
              Delete
            </button>
          </div>
        </div>

        <dl className="flex flex-wrap gap-6 text-sm">
          <div className="inline-flex items-center gap-1.5">
            <Star className="size-4 text-brand" aria-hidden />
            <dt className="sr-only">Stars</dt>
            <dd>{data.stars.toLocaleString()} stars</dd>
          </div>
          <div className="inline-flex items-center gap-1.5 text-muted">
            <GitFork className="size-4" aria-hidden />
            <dt className="sr-only">Forks</dt>
            <dd>{data.forks.toLocaleString()} forks</dd>
          </div>
          {data.primaryLanguage && (
            <div>
              <dt className="sr-only">Language</dt>
              <dd className="text-muted">{data.primaryLanguage}</dd>
            </div>
          )}
          <div>
            <dt className="sr-only">Sync</dt>
            <dd className="text-muted">
              Sync {data.syncStatus}
              {data.lastSyncedAt
                ? ` · ${new Date(data.lastSyncedAt).toLocaleString()}`
                : ''}
            </dd>
          </div>
        </dl>

        {data.topics.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {data.topics.slice(0, 12).map((topic) => (
              <li
                key={topic}
                className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-brand-dark"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Languages</h2>
          <div className="mt-4">
            {languages.isLoading ? (
              <ChartSkeleton className="h-56" />
            ) : (
              <LanguagesChart languages={languages.data?.languages ?? []} />
            )}
          </div>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Commit activity</h2>
          <p className="mt-1 text-sm text-muted">Weekly commit totals from GitHub.</p>
          <div className="mt-4">
            {activity.isLoading ? (
              <ChartSkeleton className="h-56" />
            ) : (
              <CommitActivityChart activity={activity.data?.activity ?? []} />
            )}
          </div>
        </section>
      </div>

      {data.recentCommits.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Recent commits</h2>
          <ul className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
            {data.recentCommits.slice(0, 8).map((commit) => (
              <li key={commit.sha} className="py-3">
                <a
                  href={commit.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink hover:text-brand"
                >
                  {commit.message.split('\n')[0]}
                </a>
                <p className="mt-1 text-xs text-muted">
                  {commit.author ?? 'unknown'}
                  {commit.date ? ` · ${new Date(commit.date).toLocaleString()}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
