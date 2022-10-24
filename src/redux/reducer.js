import filtersReducer from 'components/FilterRouter/FilterSlice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  filters: filtersReducer
})

export default rootReducer
