import getIdBusStopReducer from 'components/AllBusStop/IdBusStop'
import filtersReducer from 'components/FilterRouter/FilterSlice'
import checkboxReducer from 'components/TravelLocation/CheckboxTravelSlice'
import getIdTravelLocationReducer from 'components/AllInformationTravel/IdTravelLocation'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  filters: filtersReducer,
  checkbox: checkboxReducer,
  getIdBusStop: getIdBusStopReducer,
  getIdTravelLocation: getIdTravelLocationReducer
})

export default rootReducer
