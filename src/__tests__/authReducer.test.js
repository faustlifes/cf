import authReducer from '../reducers/authReducer'

beforeEach(() => {
  sessionStorage.clear()
})

describe('authReducer', () => {
  test('SESSION_EXPIRED sets sessionExpired, clears auth', () => {
    const prev = { isLoggedIn: true, user: { name: 'Alice' }, sessionExpired: false }
    const next = authReducer(prev, { type: 'SESSION_EXPIRED' })
    expect(next).toEqual({ isLoggedIn: false, user: null, sessionExpired: true })
  })

  test('LOGIN_SUCCESS clears sessionExpired', () => {
    const prev = { isLoggedIn: false, user: null, sessionExpired: true }
    const next = authReducer(prev, { type: 'LOGIN_SUCCESS', payload: { user: { name: 'Alice' } } })
    expect(next.sessionExpired).toBe(false)
    expect(next.isLoggedIn).toBe(true)
  })

  test('LOGOUT clears sessionExpired', () => {
    const prev = { isLoggedIn: true, user: { name: 'Alice' }, sessionExpired: true }
    const next = authReducer(prev, { type: 'LOGOUT' })
    expect(next.sessionExpired).toBe(false)
    expect(next.isLoggedIn).toBe(false)
  })

  test('SESSION_EXPIRED is idempotent', () => {
    const state = authReducer(undefined, { type: 'SESSION_EXPIRED' })
    const stateAgain = authReducer(state, { type: 'SESSION_EXPIRED' })
    expect(stateAgain).toEqual(state)
  })
})
