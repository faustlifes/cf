import axios from 'axios'

const api = axios.create({
  baseURL: '/',
})

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
