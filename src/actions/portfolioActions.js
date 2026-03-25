import axios from 'axios'

export const changeLink = (number) => {
  return {
    type: 'CHANGE_LINK',
    payload: number,
  }
}

export const fetchPortfolio = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/portfolio');
      dispatch({ type: 'FETCH_PORTFOLIO_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error fetching portfolio', error);
    }
  };
}
