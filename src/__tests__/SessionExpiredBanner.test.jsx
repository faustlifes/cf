import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import SessionExpiredBanner from '../components/auth/SessionExpiredBanner'
import authReducer from '../reducers/authReducer'

const makeStore = (sessionExpired = false) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { isLoggedIn: false, user: null, sessionExpired } },
  })

const renderBanner = (sessionExpired) =>
  render(
    <Provider store={makeStore(sessionExpired)}>
      <SessionExpiredBanner />
    </Provider>
  )

describe('SessionExpiredBanner', () => {
  test('renders nothing when sessionExpired is false', () => {
    const { container } = renderBanner(false)
    expect(container).toBeEmptyDOMElement()
  })

  test('renders banner when sessionExpired is true', () => {
    renderBanner(true)
    expect(screen.getByText(/session has expired/i)).toBeInTheDocument()
  })

  test('banner disappears when store transitions sessionExpired to false', () => {
    const store = makeStore(true)
    const { rerender } = render(
      <Provider store={store}>
        <SessionExpiredBanner />
      </Provider>
    )
    expect(screen.getByText(/session has expired/i)).toBeInTheDocument()

    act(() => {
      store.dispatch({ type: 'LOGIN_SUCCESS', payload: { user: { name: 'Alice' } } })
    })
    rerender(
      <Provider store={store}>
        <SessionExpiredBanner />
      </Provider>
    )
    expect(screen.queryByText(/session has expired/i)).not.toBeInTheDocument()
  })
})
