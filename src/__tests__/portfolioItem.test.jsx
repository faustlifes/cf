import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import PortfolioItem from '../components/portfolioItem'
import api from '../utils/api'
import { SESSION_EXPIRED_MESSAGE } from '../utils/constants'

jest.mock('../utils/api', () => {
  const { SESSION_EXPIRED_MESSAGE: msg } = jest.requireActual('../utils/constants')
  return {
    __esModule: true,
    SESSION_EXPIRED_MESSAGE: msg,
    default: { delete: jest.fn() },
  }
})

jest.mock('../components/portfolio/PortfolioEditor.jsx', () => () => null)

const defaultProps = {
  id: 'abc-123',
  src: '/img.jpg',
  title: 'Portfolio Item',
  category: 'Web Design',
}

function setup(props = {}) {
  const store = createStore((state = { auth: { isLoggedIn: true } }) => state)
  jest.spyOn(store, 'dispatch')
  render(
    <Provider store={store}>
      <PortfolioItem {...defaultProps} {...props} />
    </Provider>
  )
  return store
}

async function openDeleteModal() {
  fireEvent.click(screen.getByText('⋮'))
  fireEvent.click(screen.getByText('Delete'))
}

beforeEach(() => {
  api.delete.mockReset()
})

describe('PortfolioItem — delete flow', () => {
  test('dispatches DELETE_PORTFOLIO_SUCCESS on successful delete', async () => {
    api.delete.mockResolvedValueOnce({})
    const store = setup()

    await openDeleteModal()
    fireEvent.click(screen.getByText('Yes, Delete'))

    await waitFor(() =>
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'DELETE_PORTFOLIO_SUCCESS',
        payload: 'abc-123',
      })
    )
    expect(api.delete).toHaveBeenCalledWith('/api/portfolio/abc-123')
  })

  test('shows deleteError when delete fails with a non-session error', async () => {
    api.delete.mockRejectedValueOnce({ message: 'Network Error' })
    setup()

    await openDeleteModal()
    fireEvent.click(screen.getByText('Yes, Delete'))

    await waitFor(() =>
      expect(
        screen.getByText('Failed to delete item. Please try again.')
      ).toBeInTheDocument()
    )
  })

  test('suppresses deleteError when delete fails with session expired', async () => {
    api.delete.mockRejectedValueOnce({ message: SESSION_EXPIRED_MESSAGE })
    setup()

    await openDeleteModal()
    fireEvent.click(screen.getByText('Yes, Delete'))

    await waitFor(() => expect(api.delete).toHaveBeenCalled())
    expect(
      screen.queryByText('Failed to delete item. Please try again.')
    ).not.toBeInTheDocument()
  })

  test('cancel clears deleteError so error is absent on modal reopen (M5 mutation guard)', async () => {
    api.delete.mockRejectedValueOnce({ message: 'Network Error' })
    setup()

    await openDeleteModal()
    fireEvent.click(screen.getByText('Yes, Delete'))

    await waitFor(() =>
      expect(
        screen.getByText('Failed to delete item. Please try again.')
      ).toBeInTheDocument()
    )

    fireEvent.click(screen.getByText('Cancel'))

    // Reopen the modal — error must NOT appear if deleteError was cleared
    fireEvent.click(screen.getByText('⋮'))
    fireEvent.click(screen.getByText('Delete'))

    expect(
      screen.queryByText('Failed to delete item. Please try again.')
    ).not.toBeInTheDocument()
  })

  test('cancel closes the confirmation modal', async () => {
    setup()
    await openDeleteModal()

    expect(screen.getByText('Yes, Delete')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Cancel'))

    expect(screen.queryByText('Yes, Delete')).not.toBeInTheDocument()
  })

  test('dispatch is NOT called when delete fails', async () => {
    api.delete.mockRejectedValueOnce({ message: 'Network Error' })
    const store = setup()

    await openDeleteModal()
    fireEvent.click(screen.getByText('Yes, Delete'))

    await waitFor(() => expect(api.delete).toHaveBeenCalled())
    expect(store.dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'DELETE_PORTFOLIO_SUCCESS' })
    )
  })
})
