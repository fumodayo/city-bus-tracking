const initialData = ''

const getIdTravelLocationReducer = (state = initialData, action) => {
  //console.log({ state, action })
  switch (action.type) {
    case 'getIdTravelLocation':
      return (state = action.payload)
    default:
      return state
  }
}

export default getIdTravelLocationReducer
