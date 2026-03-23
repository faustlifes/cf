let stateInitial = {
  currLink: 0,
  portfolioData: [],
}

const portfolioReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case 'CHANGE_LINK': {
      return { ...state, currLink: action.payload }
    }
    case 'FETCH_PORTFOLIO_SUCCESS': {
      return { ...state, portfolioData: action.payload }
    }
    default: {
      return state
    }
  }
}

export default portfolioReducer
