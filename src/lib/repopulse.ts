import { api } from './api'
import type {
  ApiSuccess,
  DashboardSummary,
  HistoryMetric,
  HistoryPoint,
  LanguageShare,
  PaginationMeta,
  SavedRepository,
  SearchResult,
} from '../types/api'

async function getData<T>(path: string, params?: Record<string, unknown>) {
  const { data } = await api.get<ApiSuccess<T>>(path, { params })
  return { data: data.data, meta: data.meta as PaginationMeta | undefined }
}

async function postData<T>(path: string, body?: unknown) {
  const { data } = await api.post<ApiSuccess<T>>(path, body)
  return data.data
}

async function patchData<T>(path: string, body?: unknown) {
  const { data } = await api.patch<ApiSuccess<T>>(path, body)
  return data.data
}

async function deleteData(path: string) {
  await api.delete(path)
}

export function searchRepositories(q: string, page = 1, perPage = 20) {
  return getData<SearchResult>('/search/repositories', { q, page, perPage })
}

export function listRepositories(params: {
  page?: number
  limit?: number
  q?: string
  language?: string
  favorited?: boolean
  sort?: 'updatedAt' | 'stars' | 'forks' | 'name' | 'createdAt'
  order?: 'asc' | 'desc'
}) {
  return getData<SavedRepository[]>('/repositories', params)
}

export function getRepositoryByFullName(owner: string, name: string) {
  return getData<SavedRepository>(`/repositories/by-full-name/${owner}/${name}`)
}

export function saveRepository(owner: string, name: string) {
  return postData<SavedRepository>('/repositories', { owner, name })
}

export function refreshRepository(id: string) {
  return postData<SavedRepository>(`/repositories/${id}/refresh`)
}

export function setFavorite(id: string, favorited: boolean) {
  return patchData<SavedRepository>(`/repositories/${id}/favorite`, { favorited })
}

export function deleteRepository(id: string) {
  return deleteData(`/repositories/${id}`)
}

export function getDashboard() {
  return getData<DashboardSummary>('/analytics/dashboard')
}

export function getHistory(id: string, metric: HistoryMetric = 'stars') {
  return getData<{ metric: HistoryMetric; series: HistoryPoint[] }>(
    `/analytics/repositories/${id}/history`,
    { metric },
  )
}

export function getLanguages(id: string) {
  return getData<{ languages: LanguageShare[] }>(
    `/analytics/repositories/${id}/languages`,
  )
}

export function getCommitActivity(id: string) {
  return getData<{ activity: number[] }>(
    `/analytics/repositories/${id}/commit-activity`,
  )
}
