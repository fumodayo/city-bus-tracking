import filtersReducer from 'components/FilterRouter/FilterSlice'
import checkboxReducer from 'components/TravelLocation/CheckboxTravelSlice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  filters: filtersReducer,
  checkbox: checkboxReducer
})

export default rootReducer
