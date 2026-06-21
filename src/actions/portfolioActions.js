import api from '../utils/api'

export const changeLink = (number) => {
  return {
    type: 'CHANGE_LINK',
    payload: number,
  }
}

export const fetchPortfolio = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/api/portfolio');
      dispatch({ type: 'FETCH_PORTFOLIO_SUCCESS', payload: response.data });
    } catch (error) {
      if (error.message === 'Session expired.') return
      console.error('Error fetching portfolio', error);
    }
  };
}

export const createPortfolio = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/api/portfolio', data);
      dispatch({ type: 'CREATE_PORTFOLIO_SUCCESS', payload: response.data });
    } catch (error) {
      if (error.message === 'Session expired.') return
      console.error('Error creating portfolio item', error);
    }
  };
}
