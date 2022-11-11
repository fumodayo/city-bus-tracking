const initialData = { id: '', location: [] }

const getLocationDirectionsReducer = (state = initialData, action) => {
  // console.log({ state, action })
  switch (action.type) {
    case 'getLocationDirections':
      return (state = action.payload)
    default:
      return state
  }
}

export default getLocationDirectionsReducer
