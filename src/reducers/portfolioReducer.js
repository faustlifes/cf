let stateInitial = {
  currLink: 0,
}

const portfolioReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case 'CHANGE_LINK': {
      return { ...state, currLink: action.payload }
    }
    default: {
      return state
    }
  }
}

export default portfolioReducer
