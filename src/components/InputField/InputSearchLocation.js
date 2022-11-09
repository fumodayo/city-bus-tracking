const initialData = []

const getLocationByInputReducer = (state = initialData, action) => {
  // console.log({ state, action })
  switch (action.type) {
    case 'searchLocation':
      return (state = action.payload)
    default:
      return state
  }
}

export default getLocationByInputReducer
