let stateInitial = {
  data: [],
  showBlockVal: 1,
  status: '',
}

const newsReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case 'FETCH_DATA_START': {
      console.log('Data loading start')
      return { ...state, status: 'Data loading start' }
    }
    case 'FETCH_DATA_ERROR': {
      console.log('Data load error')
      return { ...state, status: 'Data load error' }
    }
    case 'RECEIVE_DATA': {
      console.log('Data received successfully')
      return {
        ...state,
        status: 'Data received successfully',
        data: action.payload,
      }
    }
    case 'SHOW_MORE': {
      return { ...state, showBlockVal: state.showBlockVal + 1 }
    }
    default: {
      return state
    }
  }
}

export default newsReducer
