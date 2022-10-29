const initialState = false

const checkboxReducer = (state = initialState, action) => {
  // console.log({ state, action })
  switch (action.type) {
    case 'checkbox/travelChange':
      return (state = action.payload)
    default:
      return state
  }
}

export default checkboxReducer
