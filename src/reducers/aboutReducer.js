﻿let stateInitial = {
  currView: 2,
  skillsShow: false,
}

const aboutReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW': {
      return { ...state, currView: action.payload }
    }
    case 'SHOW_SKILLS': {
      return { ...state, skillsShow: true }
    }
    default: {
      return state
    }
  }
}

export default aboutReducer
