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
    case 'CREATE_PORTFOLIO_SUCCESS': {
      return { ...state, portfolioData: [...state.portfolioData, action.payload] }
    }
    case 'UPDATE_PORTFOLIO_SUCCESS': {
      return {
        ...state,
        portfolioData: state.portfolioData.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      }
    }
    case 'DELETE_PORTFOLIO_SUCCESS': {
      return {
        ...state,
        portfolioData: state.portfolioData.filter((item) => item.id !== action.payload),
      }
    }
    default: {
      return state
    }
  }
}

export default portfolioReducer
