const initialState = {
  isLoggedIn: !!sessionStorage.getItem('access_token'),
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  sessionExpired: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        sessionExpired: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        sessionExpired: false,
      }
    case 'SESSION_EXPIRED':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        sessionExpired: true,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
