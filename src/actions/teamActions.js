import api, { SESSION_EXPIRED_MESSAGE } from '../utils/api'

export const fetchTeammates = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/api/teammates')
      dispatch({ type: 'FETCH_TEAMMATES_SUCCESS', payload: response.data })
    } catch (error) {
      if (error.message === SESSION_EXPIRED_MESSAGE) return
      console.error('Error fetching teammates', error)
    }
  }
}
