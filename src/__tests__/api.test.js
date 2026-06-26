import axios from 'axios'
import { setStore, resetSessionExpiredFlag } from '../utils/api'
import { SESSION_EXPIRED_MESSAGE } from '../utils/constants'

jest.mock('axios', () => {
  const mockInstance = {
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
  return { create: jest.fn(() => mockInstance), ...mockInstance }
})

// Pull the interceptor handlers registered during module load
let requestFulfilled, responseRejected

beforeAll(() => {
  const mockAxiosInstance = axios.create()
  ;[requestFulfilled] = mockAxiosInstance.interceptors.request.use.mock.calls[0]
  ;[, responseRejected] =
    mockAxiosInstance.interceptors.response.use.mock.calls[0]
})

beforeEach(() => {
  resetSessionExpiredFlag()
  sessionStorage.clear()
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
  jest.clearAllMocks()
})

const makeStore = () => ({ dispatch: jest.fn() })

const makeToken = (expOffsetMs) => {
  const exp = Math.floor((Date.now() + expOffsetMs) / 1000)
  const payload = btoa(JSON.stringify({ exp }))
  return `header.${payload}.sig`
}

describe('request interceptor — expired token', () => {
  test('dispatches SESSION_EXPIRED and rejects with "Session expired." when token is expired', async () => {
    const store = makeStore()
    setStore(store)
    sessionStorage.setItem('access_token', makeToken(-1000))

    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SESSION_EXPIRED' })
    expect(sessionStorage.getItem('access_token')).toBeNull()
  })

  test('does not dispatch twice when called concurrently (dedup flag)', async () => {
    const store = makeStore()
    setStore(store)
    sessionStorage.setItem('access_token', makeToken(-1000))

    await Promise.allSettled([
      requestFulfilled({ headers: {} }),
      requestFulfilled({ headers: {} }),
    ])

    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })

  test('dispatches again after resetSessionExpiredFlag', async () => {
    const store = makeStore()
    setStore(store)
    sessionStorage.setItem('access_token', makeToken(-1000))

    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )
    resetSessionExpiredFlag()

    sessionStorage.setItem('access_token', makeToken(-1000))
    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    expect(store.dispatch).toHaveBeenCalledTimes(2)
  })

  test('does not dispatch when _store is null — flag stays unset for retry', async () => {
    setStore(null)
    sessionStorage.setItem('access_token', makeToken(-1000))

    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    // Flag must NOT be latched — a subsequent call with a real store must dispatch
    const store = makeStore()
    setStore(store)
    sessionStorage.setItem('access_token', makeToken(-1000))
    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SESSION_EXPIRED' })
  })

  test('token expiring at exactly Date.now() is treated as expired', async () => {
    const store = makeStore()
    setStore(store)
    const exp = Math.floor(Date.now() / 1000)
    const payload = btoa(JSON.stringify({ exp }))
    sessionStorage.setItem('access_token', `h.${payload}.s`)

    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SESSION_EXPIRED' })
  })

  test('attaches Authorization header for a valid token', async () => {
    const store = makeStore()
    setStore(store)
    sessionStorage.setItem('access_token', makeToken(60_000))

    const config = { headers: {} }
    const result = await requestFulfilled(config)

    expect(result.headers.Authorization).toMatch(/^Bearer /)
    expect(store.dispatch).not.toHaveBeenCalled()
  })
})

describe('response interceptor — 401', () => {
  test('dispatches SESSION_EXPIRED and rejects with "Session expired." on 401', async () => {
    const store = makeStore()
    setStore(store)

    const axiosError = {
      response: { status: 401 },
      message: 'Request failed with status code 401',
    }
    await expect(responseRejected(axiosError)).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SESSION_EXPIRED' })
  })

  test('does not dispatch twice when request and response interceptors both fire', async () => {
    const store = makeStore()
    setStore(store)
    sessionStorage.setItem('access_token', makeToken(-1000))

    // Simulate: local expiry fires first
    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    // Then a concurrent 401 response arrives
    const axiosError = {
      response: { status: 401 },
      message: 'Request failed with status code 401',
    }
    await expect(responseRejected(axiosError)).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })

  test('passes through non-401 errors unchanged', async () => {
    const axiosError = { response: { status: 500 }, message: 'Server error' }
    await expect(responseRejected(axiosError)).rejects.toMatchObject({
      message: 'Server error',
    })
  })
})

describe('reload timer', () => {
  test('navigates to / after 3s on session expiry', async () => {
    const store = makeStore()
    setStore(store)
    delete window.location
    window.location = { href: '' }

    sessionStorage.setItem('access_token', makeToken(-1000))
    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    jest.advanceTimersByTime(3000)
    expect(window.location.href).toBe('/')
  })

  test('resetSessionExpiredFlag cancels the pending reload', async () => {
    const store = makeStore()
    setStore(store)
    delete window.location
    window.location = { href: '' }

    sessionStorage.setItem('access_token', makeToken(-1000))
    await expect(requestFulfilled({ headers: {} })).rejects.toThrow(
      SESSION_EXPIRED_MESSAGE
    )

    resetSessionExpiredFlag()
    jest.advanceTimersByTime(3000)
    expect(window.location.href).toBe('')
  })
})
