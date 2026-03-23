let stateInitial = {
  currView: 2,
  skillsShow: false,
  aboutData: {},
}

const aboutReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW': {
      return { ...state, currView: action.payload }
    }
    case 'SHOW_SKILLS': {
      return { ...state, skillsShow: true }
    }
    case 'FETCH_ABOUT_SUCCESS': {
      return { ...state, aboutData: action.payload }
    }
    default: {
      return state
    }
  }
}

export default aboutReducer
