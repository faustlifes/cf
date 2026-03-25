import axios from 'axios'

export const showView = (number) => {
  return {
    type: 'CHANGE_VIEW',
    payload: number,
  }
}

export const showSkillsEnable = () => {
  return {
    type: 'SHOW_SKILLS',
  }
}

export const fetchAbouts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/about');
      dispatch({ type: 'FETCH_ABOUT_SUCCESS', payload: response.data[0] || {} }); // Assume a single document or object for about
    } catch (error) {
      console.error('Error fetching about', error);
    }
  };
}
