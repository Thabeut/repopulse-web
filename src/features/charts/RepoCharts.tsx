import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { HistoryPoint, LanguageShare } from '../../types/api'

const COLORS = ['#0d9488', '#0f766e', '#14b8a6', '#5eead4', '#134e4a', '#99f6e4']

export function StarsHistoryChart({ series }: { series: HistoryPoint[] }) {
  const data = series.map((point) => ({
    date: new Date(point.t).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    }),
    stars: point.v,
  }))

  if (data.length === 0) {
    return <EmptyChart label="No snapshot history yet — save or refresh this repo." />
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="starsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} width={48} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="stars"
            stroke="#0d9488"
            strokeWidth={2}
            fill="url(#starsFill)"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function LanguagesChart({ languages }: { languages: LanguageShare[] }) {
  const top = languages.slice(0, 6)
  if (top.length === 0) {
    return <EmptyChart label="No language breakdown available." />
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={top}
            dataKey="percent"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={80}
            paddingAngle={2}
            animationDuration={700}
          >
            {top.map((_, index) => (
              <Cell key={top[index].name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, 'Share']}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 13,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
        {top.map((lang, index) => (
          <li key={lang.name} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            {lang.name} {lang.percent}%
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CommitActivityChart({ activity }: { activity: number[] }) {
  const data = activity.map((commits, index) => ({
    week: `W${index + 1}`,
    commits,
  }))

  if (data.length === 0) {
    return <EmptyChart label="No commit activity series yet." />
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 10 }} interval={6} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} width={36} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 13,
            }}
          />
          <Bar dataKey="commits" fill="#0d9488" radius={[2, 2, 0, 0]} animationDuration={700} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-48 items-center justify-center text-sm text-muted">
      {label}
    </div>
  )
}
