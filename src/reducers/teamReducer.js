const stateInitial = {
  teamData: [],
}

const teamReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case 'FETCH_TEAMMATES_SUCCESS': {
      return {
        ...state,
        teamData: action.payload,
      }
    }
    case 'UPDATE_TEAMMATE_SUCCESS': {
      return {
        ...state,
        teamData: state.teamData.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      }
    }
    case 'DELETE_TEAMMATE_SUCCESS': {
      return {
        ...state,
        teamData: state.teamData.filter((item) => item.id !== action.payload),
      }
    }
    default: {
      return state
    }
  }
}

export default teamReducer
