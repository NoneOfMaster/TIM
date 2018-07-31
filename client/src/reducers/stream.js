const stream = (state = {}, action) => {
  switch (action.type) {
    case 'SUBSCRIBE_TO':
      return {
        ...state,
        theaterMode: action.updateObj.theaterMode,
      }
    default:
      return state
  }
}

export default stream
