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
    default: {
      return state
    }
  }
}

export default teamReducer
