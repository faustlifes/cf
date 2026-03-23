import axios from 'axios'

let countTimerId

export const initOptions = (data) => {
  return {
    type: 'INIT',
    payload: data,
  }
}

export const startCount = (time) => {
  return function (dispatch) {
    if (countTimerId !== undefined) {
      return
    }
    countTimerId = setInterval(() => {
      dispatch({ type: 'NEXT_VAL' })
    }, time)
  }
}

export const stopCount = () => {
  return function (dispatch) {
    if (countTimerId) {
      clearInterval(countTimerId)
      countTimerId = undefined
    }
    dispatch({ type: 'FINISHED' })
  }
}

export const fetchTeamFacts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/team-facts');
      dispatch({ type: 'FETCH_TEAM_FACTS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error fetching team facts', error);
    }
  };
}
