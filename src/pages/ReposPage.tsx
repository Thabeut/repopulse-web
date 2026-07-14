import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GitFork, Heart, Star, Trash2 } from 'lucide-react'
import {
  deleteRepository,
  listRepositories,
  setFavorite,
} from '../lib/repopulse'
import type { SavedRepository } from '../types/api'

export function ReposPage() {
  const [q, setQ] = useState('')
  const [favoritedOnly, setFavoritedOnly] = useState(false)
  const [sort, setSort] = useState<'updatedAt' | 'stars' | 'name'>('updatedAt')
  const queryClient = useQueryClient()

  const params = useMemo(
    () => ({
      page: 1,
      limit: 50,
      q: q.trim() || undefined,
      favorited: favoritedOnly ? true : undefined,
      sort,
      order: 'desc' as const,
    }),
    [q, favoritedOnly, sort],
  )

  const list = useQuery({
    queryKey: ['repositories', params],
    queryFn: async () => {
      const res = await listRepositories(params)
      return { items: res.data, meta: res.meta }
    },
  })

  const favorite = useMutation({
    mutationFn: ({ id, favorited }: { id: string; favorited: boolean }) =>
      setFavorite(id, favorited),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['repositories'] })
      void queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] })
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteRepository(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['repositories'] })
      void queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] })
    },
  })

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Repositories</h1>
        <p className="mt-2 text-muted">Your saved library, filtered and sorted via the API.</p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name…"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 sm:max-w-xs"
        />
        <label className="inline-flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={favoritedOnly}
            onChange={(e) => setFavoritedOnly(e.target.checked)}
            className="accent-brand"
          />
          Favorites only
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink"
        >
          <option value="updatedAt">Recently updated</option>
          <option value="stars">Stars</option>
          <option value="name">Name</option>
        </select>
      </div>

      {list.isLoading && <p className="text-muted">Loading repos…</p>}
      {list.isError && <p className="text-sm text-red-600">Failed to load repositories.</p>}

      {list.data && list.data.items.length === 0 && (
        <p className="text-sm text-muted">
          Nothing here yet.{' '}
          <Link to="/app/search" className="text-brand underline">
            Search and save
          </Link>
          .
        </p>
      )}

      {list.data && list.data.items.length > 0 && (
        <ul className="divide-y divide-slate-200/80 border-y border-slate-200/80">
          {list.data.items.map((repo) => (
            <RepoRow
              key={repo.id}
              repo={repo}
              onFavorite={() =>
                favorite.mutate({ id: repo.id, favorited: !repo.favorited })
              }
              onDelete={() => {
                if (window.confirm(`Remove ${repo.fullName} from your library?`)) {
                  remove.mutate(repo.id)
                }
              }}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

function RepoRow({
  repo,
  onFavorite,
  onDelete,
}: {
  repo: SavedRepository
  onFavorite: () => void
  onDelete: () => void
}) {
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link to={`/app/repos/${repo.owner}/${repo.name}`} className="group min-w-0">
        <div className="flex items-center gap-2">
          <img
            src={repo.ownerAvatarUrl}
            alt=""
            className="size-7 rounded-full"
            width={28}
            height={28}
          />
          <span className="font-medium text-ink group-hover:text-brand">{repo.fullName}</span>
          {repo.favorited && (
            <Heart className="size-3.5 fill-brand text-brand" aria-label="Favorited" />
          )}
        </div>
        {repo.description && (
          <p className="mt-1 line-clamp-1 text-sm text-muted">{repo.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
          {repo.primaryLanguage && <span>{repo.primaryLanguage}</span>}
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" aria-hidden />
            {repo.stars.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="size-3" aria-hidden />
            {repo.forks.toLocaleString()}
          </span>
        </div>
      </Link>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onFavorite}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink transition hover:border-brand/40"
          aria-label={repo.favorited ? 'Unfavorite' : 'Favorite'}
        >
          <Heart
            className={`size-4 ${repo.favorited ? 'fill-brand text-brand' : 'text-muted'}`}
            aria-hidden
          />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-muted transition hover:border-red-200 hover:text-red-600"
          aria-label="Delete"
        >
          <Trash2 className="size-4" aria-hidden />
        </button>
      </div>
    </li>
  )
}
