import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GitFork, Search, Star } from 'lucide-react'
import { SearchResultsSkeleton } from '../components/Skeleton'
import { saveRepository, searchRepositories } from '../lib/repopulse'
import type { SearchItem } from '../types/api'

export function SearchPage() {
  const [q, setQ] = useState('')
  const [submitted, setSubmitted] = useState('')
  const queryClient = useQueryClient()

  const results = useQuery({
    queryKey: ['search', submitted],
    enabled: submitted.length > 0,
    queryFn: async () => (await searchRepositories(submitted)).data,
  })

  const save = useMutation({
    mutationFn: ({ owner, name }: { owner: string; name: string }) =>
      saveRepository(owner, name),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['repositories'] })
      void queryClient.invalidateQueries({ queryKey: ['analytics', 'dashboard'] })
    },
  })

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = q.trim()
    if (next) setSubmitted(next)
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Search</h1>
        <p className="mt-2 text-muted">Find GitHub repositories and save them to your library.</p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="search-q">
          Search query
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="search-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="nestjs, react, vite…"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Search
        </button>
      </form>

      {results.isFetching && <SearchResultsSkeleton />}
      {results.isError && !results.isFetching && (
        <p className="text-sm text-red-600">Search failed. Check your API and GitHub token.</p>
      )}

      {results.data && !results.isFetching && (
        <div>
          <p className="text-sm text-muted">
            {results.data.total.toLocaleString()} results
            {results.data.total > results.data.items.length
              ? ` · showing ${results.data.items.length}`
              : ''}
          </p>
          <ul className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
            {results.data.items.map((item) => (
              <SearchRow
                key={item.githubId}
                item={item}
                saving={
                  save.isPending &&
                  save.variables?.owner === item.owner &&
                  save.variables?.name === item.name
                }
                savedId={
                  save.isSuccess &&
                  save.variables?.owner === item.owner &&
                  save.variables?.name === item.name
                    ? save.data.id
                    : null
                }
                onSave={() => save.mutate({ owner: item.owner, name: item.name })}
              />
            ))}
          </ul>
          {save.isError && (
            <p className="mt-3 text-sm text-red-600">
              Could not save repository. It may already be in your library.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function SearchRow({
  item,
  onSave,
  saving,
  savedId,
}: {
  item: SearchItem
  onSave: () => void
  saving: boolean
  savedId: string | null
}) {
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <img
            src={item.ownerAvatarUrl}
            alt=""
            className="size-6 rounded-full"
            width={24}
            height={24}
          />
          <a
            href={item.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink hover:text-brand"
          >
            {item.fullName}
          </a>
        </div>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
          {item.language && <span>{item.language}</span>}
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" aria-hidden />
            {item.stars.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="size-3" aria-hidden />
            {item.forks.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        {savedId ? (
          <Link
            to={`/app/repos/${item.owner}/${item.name}`}
            className="inline-flex rounded-lg border border-brand/30 bg-teal-50 px-3 py-2 text-sm font-medium text-brand"
          >
            Open in library
          </Link>
        ) : (
          <button
            type="button"
            disabled={saving}
            onClick={onSave}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink transition hover:border-brand/40 hover:text-brand disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        )}
      </div>
    </li>
  )
}
