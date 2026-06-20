import api from '../utils/api'

export const showMore = () => {
  return {
    type: 'SHOW_MORE',
  }
}

export const requestNews = () => {
  return {
    type: 'FETCH_DATA_START',
  }
}

export const fetchError = () => {
  return {
    type: 'FETCH_DATA_ERROR',
  }
}

export const receiveNews = (newsData) => {
  return {
    type: 'RECEIVE_DATA',
    payload: newsData,
  }
}

export function fetchNews(path) {
  return async function (dispatch) {
    dispatch(requestNews())
    try {
      const response = await api.get(path)
      console.log('fetchNews response data:', response.data)
      dispatch(receiveNews(response.data))
    } catch (error) {
      if (error.message === 'Session expired.') return
      console.error('fetchNews error:', error)
      dispatch(fetchError())
    }
  }
}
