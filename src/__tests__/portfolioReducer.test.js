import portfolioReducer from '../reducers/portfolioReducer'

const item1 = {
  id: 'abc-1',
  src: '/img1.jpg',
  title: 'Work 1',
  category: 'Web Design',
}
const item2 = {
  id: 'abc-2',
  src: '/img2.jpg',
  title: 'Work 2',
  category: 'Wordpress',
}

describe('portfolioReducer', () => {
  test('returns initial state for unknown action', () => {
    const state = portfolioReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ currLink: 0, portfolioData: [] })
  })

  test('unknown action does not mutate existing state', () => {
    const prev = { currLink: 1, portfolioData: [item1] }
    const next = portfolioReducer(prev, { type: 'NOOP' })
    expect(next).toBe(prev)
  })

  test('CHANGE_LINK updates currLink', () => {
    const next = portfolioReducer(undefined, {
      type: 'CHANGE_LINK',
      payload: 3,
    })
    expect(next.currLink).toBe(3)
    expect(next.portfolioData).toEqual([])
  })

  test('FETCH_PORTFOLIO_SUCCESS replaces portfolioData and preserves currLink', () => {
    const prev = { currLink: 2, portfolioData: [item1] }
    const next = portfolioReducer(prev, {
      type: 'FETCH_PORTFOLIO_SUCCESS',
      payload: [item2],
    })
    expect(next.portfolioData).toEqual([item2])
    expect(next.currLink).toBe(2)
  })

  test('CREATE_PORTFOLIO_SUCCESS appends item to empty list', () => {
    const next = portfolioReducer(undefined, {
      type: 'CREATE_PORTFOLIO_SUCCESS',
      payload: item1,
    })
    expect(next.portfolioData).toEqual([item1])
  })

  test('CREATE_PORTFOLIO_SUCCESS appends item to existing list', () => {
    const prev = { currLink: 0, portfolioData: [item1] }
    const next = portfolioReducer(prev, {
      type: 'CREATE_PORTFOLIO_SUCCESS',
      payload: item2,
    })
    expect(next.portfolioData).toEqual([item1, item2])
  })

  test('CREATE_PORTFOLIO_SUCCESS does not mutate existing array', () => {
    const prev = { currLink: 0, portfolioData: [item1] }
    const next = portfolioReducer(prev, {
      type: 'CREATE_PORTFOLIO_SUCCESS',
      payload: item2,
    })
    expect(next.portfolioData).not.toBe(prev.portfolioData)
  })

  test('UPDATE_PORTFOLIO_SUCCESS replaces matching item by id', () => {
    const updated = { ...item1, title: 'New Title' }
    const prev = { currLink: 0, portfolioData: [item1, item2] }
    const next = portfolioReducer(prev, {
      type: 'UPDATE_PORTFOLIO_SUCCESS',
      payload: updated,
    })
    expect(next.portfolioData[0]).toEqual(updated)
    expect(next.portfolioData[1]).toEqual(item2)
    expect(next.portfolioData).toHaveLength(2)
  })

  test('UPDATE_PORTFOLIO_SUCCESS leaves list unchanged when id not found', () => {
    const ghost = {
      id: 'ghost-id',
      src: '/x.jpg',
      title: 'Ghost',
      category: 'Web Design',
    }
    const prev = { currLink: 0, portfolioData: [item1] }
    const next = portfolioReducer(prev, {
      type: 'UPDATE_PORTFOLIO_SUCCESS',
      payload: ghost,
    })
    expect(next.portfolioData).toEqual([item1])
  })

  test('DELETE_PORTFOLIO_SUCCESS removes item by string id', () => {
    const prev = { currLink: 0, portfolioData: [item1, item2] }
    const next = portfolioReducer(prev, {
      type: 'DELETE_PORTFOLIO_SUCCESS',
      payload: 'abc-1',
    })
    expect(next.portfolioData).toEqual([item2])
  })

  test('DELETE_PORTFOLIO_SUCCESS on last item leaves empty array', () => {
    const prev = { currLink: 0, portfolioData: [item1] }
    const next = portfolioReducer(prev, {
      type: 'DELETE_PORTFOLIO_SUCCESS',
      payload: 'abc-1',
    })
    expect(next.portfolioData).toEqual([])
  })

  test('DELETE_PORTFOLIO_SUCCESS with unknown id leaves list unchanged', () => {
    const prev = { currLink: 0, portfolioData: [item1, item2] }
    const next = portfolioReducer(prev, {
      type: 'DELETE_PORTFOLIO_SUCCESS',
      payload: 'no-such-id',
    })
    expect(next.portfolioData).toEqual([item1, item2])
  })

  // Type-contract guard: entity IDs are string UUIDs. A numeric payload would be a caller bug.
  // This test documents that strict !== prevents numeric mismatch from silently deleting items.
  test('DELETE_PORTFOLIO_SUCCESS: numeric payload does not match string id (type-contract guard)', () => {
    const prev = {
      currLink: 0,
      portfolioData: [
        { id: '1', src: '/a.jpg', title: 'A', category: 'Web Design' },
      ],
    }
    const next = portfolioReducer(prev, {
      type: 'DELETE_PORTFOLIO_SUCCESS',
      payload: 1,
    })
    expect(next.portfolioData).toHaveLength(1)
  })

  test('DELETE_PORTFOLIO_SUCCESS does not mutate existing array', () => {
    const prev = { currLink: 0, portfolioData: [item1] }
    const next = portfolioReducer(prev, {
      type: 'DELETE_PORTFOLIO_SUCCESS',
      payload: 'abc-1',
    })
    expect(next.portfolioData).not.toBe(prev.portfolioData)
  })
})
