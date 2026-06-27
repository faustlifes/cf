import api, { SESSION_EXPIRED_MESSAGE } from '../utils/api'

export const addComment = (data) => {
  return {
    type: 'ADD_COMMENT',
    payload: data,
  }
}

export const removeComment = (id) => {
  return {
    type: 'REMOVE_COMMENT',
    payload: id,
  }
}

export const initComments = (data) => {
  return {
    type: 'INIT_COMMENTS',
    payload: data,
  }
}

export const fetchFeedbacks = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/api/feedback');
      dispatch(initComments(response.data));
    } catch (error) {
      if (error.message === SESSION_EXPIRED_MESSAGE) return
      console.error('Error fetching feedbacks', error);
    }
  };
}
