import axios from 'axios'

const api = axios.create({
  baseURL: '/',
})

let _store = null
export const setStore = (store) => { _store = store }

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

let _bannerShown = false
const showSessionExpiredBanner = () => {
  if (_bannerShown) return
  _bannerShown = true

  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('user')
  if (_store) _store.dispatch({ type: 'LOGOUT' })

  const banner = document.createElement('div')
  banner.textContent = 'Your session has expired. The page will reload shortly...'
  Object.assign(banner.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '99999',
    background: '#c0392b',
    color: '#fff',
    textAlign: 'center',
    padding: '14px 20px',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
  })
  document.body.prepend(banner)

  setTimeout(() => window.location.reload(), 3000)
}

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      if (isTokenExpired(token)) {
        showSessionExpiredBanner()
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
      showSessionExpiredBanner()
    }
    return Promise.reject(error)
  }
)

export default api
