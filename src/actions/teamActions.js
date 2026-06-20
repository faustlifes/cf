import api from '../utils/api'

export const fetchTeammates = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/api/teammates')
      dispatch({ type: 'FETCH_TEAMMATES_SUCCESS', payload: response.data })
    } catch (error) {
      console.error('Error fetching teammates', error)
    }
  }
}
