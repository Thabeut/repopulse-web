import type { HTMLAttributes } from 'react'

export function Skeleton({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={`animate-shimmer rounded-md bg-slate-200/80 ${className}`}
      {...props}
    />
  )
}

export function SkeletonText({
  lines = 1,
  className = '',
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className={`h-3 ${index === lines - 1 && lines > 1 ? 'w-[66%]' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="Loading dashboard">
      <header className="space-y-3">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </header>

      <dl className="grid gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="border-l-2 border-slate-200 pl-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-8 w-16" />
          </div>
        ))}
      </dl>

      <section>
        <div className="flex items-end justify-between gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <ul className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className="flex items-center justify-between gap-4 py-3">
              <Skeleton className="h-4 w-44" />
              <div className="flex gap-4">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-14" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-40 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
    </div>
  )
}

export function RepoListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul
      className="divide-y divide-slate-200/80 border-y border-slate-200/80"
      aria-busy="true"
      aria-label="Loading repositories"
    >
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-3 w-[75%] max-w-md" />
            <div className="flex gap-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="size-9 rounded-lg" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function SearchResultsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading search results">
      <Skeleton className="h-3 w-28" />
      <ul className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
        {Array.from({ length: rows }, (_, index) => (
          <li
            key={index}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-6 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <SkeletonText lines={2} className="max-w-xl" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <Skeleton className="h-9 w-20 shrink-0 rounded-lg" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RepoDetailSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="Loading repository">
      <header className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <SkeletonText lines={2} className="max-w-2xl" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-5 w-16 rounded-md" />
          ))}
        </div>
      </header>

      <section>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-3 w-72 max-w-full" />
        <ChartSkeleton className="mt-4" />
      </section>

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <Skeleton className="h-6 w-28" />
          <ChartSkeleton className="mt-4 h-56" />
        </section>
        <section>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="mt-2 h-3 w-48" />
          <ChartSkeleton className="mt-4 h-56" />
        </section>
      </div>

      <section>
        <Skeleton className="h-6 w-40" />
        <ul className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className="space-y-2 py-3">
              <Skeleton className="h-4 w-[75%] max-w-lg" />
              <Skeleton className="h-3 w-40" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function ChartSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-64 items-end gap-2 rounded-lg border border-slate-200/80 bg-white/40 px-4 py-6 ${className}`}
      aria-hidden
    >
      {[40, 65, 45, 80, 55, 70, 35, 90, 60, 50, 75, 42].map((height, index) => (
        <Skeleton
          key={index}
          className="flex-1 rounded-t-sm rounded-b-none"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

export function AuthBootSkeleton() {
  return (
    <main
      className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6"
      aria-busy="true"
      aria-label="Loading session"
    >
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-4 h-11 w-44 rounded-lg" />
      </div>
    </main>
  )
}

export function AppShellSkeleton() {
  return (
    <div className="min-h-svh" aria-busy="true" aria-label="Loading app">
      <header className="border-b border-slate-200/80 bg-white/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8">
            <Skeleton className="h-6 w-28" />
            <div className="hidden gap-2 sm:flex">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-20 rounded-lg" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <DashboardSkeleton />
      </main>
    </div>
  )
}
