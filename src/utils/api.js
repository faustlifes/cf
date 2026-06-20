import axios from 'axios'

const api = axios.create({
  baseURL: '/',
})

let _store = null
export const setStore = (store) => { _store = store }

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp == null || payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

let _sessionExpiredDispatched = false
export const resetSessionExpiredFlag = () => { _sessionExpiredDispatched = false }
const handleSessionExpired = () => {
  if (_sessionExpiredDispatched) return
  _sessionExpiredDispatched = true
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('user')
  if (_store) _store.dispatch({ type: 'SESSION_EXPIRED' })
}

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      if (isTokenExpired(token)) {
        handleSessionExpired()
        return Promise.reject(new Error('Session expired.'))
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
    }
    return Promise.reject(error)
  }
)

export default api
