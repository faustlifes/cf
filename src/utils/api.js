import axios from 'axios'
import { SESSION_EXPIRED_MESSAGE } from './constants'

export { SESSION_EXPIRED_MESSAGE }

const api = axios.create({
  baseURL: '/',
})

let _store = null
export const setStore = (store) => {
  _store = store
}

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp == null || payload.exp * 1000 <= Date.now()
  } catch {
    return true
  }
}

let _sessionExpiredDispatched = false
let _reloadTimer = null

export const resetSessionExpiredFlag = () => {
  _sessionExpiredDispatched = false
  if (_reloadTimer) {
    clearTimeout(_reloadTimer)
    _reloadTimer = null
  }
}

const handleSessionExpired = () => {
  if (_sessionExpiredDispatched) return
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('user')
  if (!_store) return
  _sessionExpiredDispatched = true
  _store.dispatch({ type: 'SESSION_EXPIRED' })
  _reloadTimer = setTimeout(() => {
    window.location.href = '/'
  }, 3000)
}

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      if (isTokenExpired(token)) {
        handleSessionExpired()
        return Promise.reject(new Error(SESSION_EXPIRED_MESSAGE))
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleSessionExpired()
      return Promise.reject(new Error(SESSION_EXPIRED_MESSAGE))
    }
    return Promise.reject(error)
  }
)

export default api
