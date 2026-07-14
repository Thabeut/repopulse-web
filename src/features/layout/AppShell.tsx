import { NavLink, Outlet } from 'react-router-dom'
import { Activity, LayoutDashboard, LogOut, Search, Star } from 'lucide-react'
import { useAuth } from '../auth/AuthProvider'

const links = [
  { to: '/app', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/search', end: false, label: 'Search', icon: Search },
  { to: '/app/repos', end: false, label: 'Repos', icon: Star },
]

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-svh">
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8">
            <NavLink to="/app" className="group flex items-center gap-2">
              <Activity className="size-5 text-brand transition group-hover:scale-110" aria-hidden />
              <span className="font-display text-lg font-bold tracking-tight text-ink">
                RepoPulse
              </span>
            </NavLink>
            <nav className="hidden items-center gap-1 sm:flex" aria-label="App">
              {links.map(({ to, end, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                      isActive
                        ? 'bg-teal-50 text-brand'
                        : 'text-muted hover:bg-slate-50 hover:text-ink',
                    ].join(' ')
                  }
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[10rem] truncate text-sm text-muted sm:inline">
              {user?.email ?? user?.displayName}
            </span>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink transition hover:border-brand/40 hover:text-brand"
            >
              <LogOut className="size-4" aria-hidden />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
        <nav
          className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 sm:hidden"
          aria-label="Mobile"
        >
          {links.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium',
                  isActive ? 'bg-teal-50 text-brand' : 'text-muted',
                ].join(' ')
              }
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl animate-fade-in px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
