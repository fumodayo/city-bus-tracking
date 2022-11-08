const initState = []

const filtersReducer = (state = initState, action) => {
  // console.log({ state, action })
  switch (action.type) {
    case 'filters/searchFilterChange':
      return (state = action.payload)
    default:
      return state
  }
}

export default filtersReducer
