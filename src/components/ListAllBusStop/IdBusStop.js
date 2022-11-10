const initialData = ''

const getIdBusStopReducer = (state = initialData, action) => {
  // console.log({ state, action })
  switch (action.type) {
    case 'getIdBusStop':
      return (state = action.payload)
    default:
      return state
  }
}

export default getIdBusStopReducer
