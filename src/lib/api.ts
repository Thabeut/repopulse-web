import axios from 'axios'
import { getFirebaseAuth, isFirebaseConfigured } from './firebase'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
})

api.interceptors.request.use(async (config) => {
  if (!isFirebaseConfigured) {
    return config
  }
  const user = getFirebaseAuth().currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
