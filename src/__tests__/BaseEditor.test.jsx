import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import BaseEditor from '../components/common/BaseEditor'
import api from '../utils/api'
import { SESSION_EXPIRED_MESSAGE } from '../utils/constants'

jest.mock('../utils/api', () => {
  const { SESSION_EXPIRED_MESSAGE: msg } = jest.requireActual('../utils/constants')
  return {
    __esModule: true,
    SESSION_EXPIRED_MESSAGE: msg,
    default: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
  }
})

const noop = () => {}

beforeEach(() => {
  api.post.mockReset()
  api.put.mockReset()
})

describe('BaseEditor.handleSave — POST vs PUT routing (MF-3)', () => {
  test('fires PUT when initialData has an id', async () => {
    api.put.mockResolvedValueOnce({ data: { id: '1', title: 'Updated' } })
    const onSaveSuccess = jest.fn()

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{ id: '1', title: 'Old' }}
        onSaveSuccess={onSaveSuccess}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() =>
      expect(api.put).toHaveBeenCalledWith('/api/portfolio/1', {
        id: '1',
        title: 'Old',
      })
    )
    expect(api.post).not.toHaveBeenCalled()
    expect(onSaveSuccess).toHaveBeenCalledWith({ id: '1', title: 'Updated' })
  })

  test('fires POST when initialData has no id', async () => {
    api.post.mockResolvedValueOnce({ data: { id: '2', title: 'New Item' } })
    const onSaveSuccess = jest.fn()

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{ title: 'New Item' }}
        onSaveSuccess={onSaveSuccess}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith('/api/portfolio', {
        title: 'New Item',
      })
    )
    expect(api.put).not.toHaveBeenCalled()
    expect(onSaveSuccess).toHaveBeenCalledWith({ id: '2', title: 'New Item' })
  })

  test('fires POST when initialData is an empty object', async () => {
    api.post.mockResolvedValueOnce({ data: { id: '3' } })

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{}}
        onSaveSuccess={noop}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(api.post).toHaveBeenCalled())
    expect(api.put).not.toHaveBeenCalled()
  })
})

describe('BaseEditor.handleSave — negative paths (MF-8)', () => {
  test('shows error message when PUT fails with a server error', async () => {
    api.put.mockRejectedValueOnce({
      message: 'Server error',
      response: { data: { message: 'Internal server error' } },
    })

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{ id: '1' }}
        onSaveSuccess={noop}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() =>
      expect(screen.getByText('Internal server error')).toBeInTheDocument()
    )
  })

  test('shows error message when POST fails with a network error', async () => {
    api.post.mockRejectedValueOnce({ message: 'Network Error' })

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{}}
        onSaveSuccess={noop}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() =>
      expect(screen.getByText('Network Error')).toBeInTheDocument()
    )
  })

  test('falls back to generic message when error has no message or response', async () => {
    api.post.mockRejectedValueOnce({})

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{}}
        onSaveSuccess={noop}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() =>
      expect(screen.getByText('Failed to save changes.')).toBeInTheDocument()
    )
  })

  test('does NOT show error when PUT rejects with "Session expired."', async () => {
    api.put.mockRejectedValueOnce({ message: SESSION_EXPIRED_MESSAGE })

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{ id: '1' }}
        onSaveSuccess={noop}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(api.put).toHaveBeenCalled())
    expect(screen.queryByText(SESSION_EXPIRED_MESSAGE)).not.toBeInTheDocument()
  })

  test('does NOT show error when POST rejects with "Session expired."', async () => {
    api.post.mockRejectedValueOnce({ message: SESSION_EXPIRED_MESSAGE })

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{}}
        onSaveSuccess={noop}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(api.post).toHaveBeenCalled())
    expect(screen.queryByText(SESSION_EXPIRED_MESSAGE)).not.toBeInTheDocument()
  })

  test('onSaveSuccess is NOT called when save fails', async () => {
    api.put.mockRejectedValueOnce({ message: 'Server error' })
    const onSaveSuccess = jest.fn()

    render(
      <BaseEditor
        endpoint='/api/portfolio'
        initialData={{ id: '1' }}
        onSaveSuccess={onSaveSuccess}
        onClose={noop}
      />
    )

    fireEvent.click(screen.getByText('Save Changes'))

    await waitFor(() => expect(api.put).toHaveBeenCalled())
    expect(onSaveSuccess).not.toHaveBeenCalled()
  })
})
