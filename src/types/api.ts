export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiSuccess<T> {
  success: true
  data: T
  meta?: PaginationMeta
}

export interface SearchItem {
  githubId: number
  fullName: string
  name: string
  description: string | null
  htmlUrl: string
  stars: number
  forks: number
  language: string | null
  owner: string
  ownerAvatarUrl: string
}

export interface SearchResult {
  total: number
  items: SearchItem[]
}

export type SyncStatus = 'idle' | 'syncing' | 'error'

export interface ContributorEmbed {
  login: string
  avatarUrl: string
  contributions: number
  htmlUrl: string
}

export interface ReleaseEmbed {
  tagName: string
  name: string
  publishedAt: string | null
  htmlUrl: string
}

export interface CommitEmbed {
  sha: string
  message: string
  author: string | null
  date: string | null
  htmlUrl: string
}

export interface SavedRepository {
  id: string
  userId: string
  githubId: number
  owner: string
  ownerAvatarUrl: string
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  defaultBranch: string
  primaryLanguage: string | null
  languages: Record<string, number>
  topics: string[]
  license: string | null
  stars: number
  forks: number
  watchers: number
  openIssues: number
  isFork: boolean
  favorited: boolean
  contributors: ContributorEmbed[]
  releases: ReleaseEmbed[]
  recentCommits: CommitEmbed[]
  commitActivity: number[]
  lastSyncedAt: string | null
  syncStatus: SyncStatus
  lastSyncError: string | null
  createdAt: string
  updatedAt: string
}

export interface LanguageShare {
  name: string
  bytes: number
  percent: number
}

export interface DashboardSummary {
  repositoryCount: number
  favoriteCount: number
  totalStars: number
  recentlySynced: Array<{
    id: string
    fullName: string
    lastSyncedAt: string | null
    stars: number
  }>
}
