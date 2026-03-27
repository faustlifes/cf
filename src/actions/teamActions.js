import axios from 'axios'

export const fetchTeammates = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/teammates')
      dispatch({ type: 'FETCH_TEAMMATES_SUCCESS', payload: response.data })
    } catch (error) {
      console.error('Error fetching teammates', error)
    }
  }
}
