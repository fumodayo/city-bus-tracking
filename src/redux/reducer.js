import getIdBusStopReducer from 'components/ListAllBusStop/IdBusStop'
import filtersReducer from 'components/FilterRoutes/FilterSlice'
import checkboxReducer from 'components/FilterTravelMap/CheckboxTravelSlice'
import getIdTravelLocationReducer from 'components/ListGuideTravel/IdTravelLocation'
import getLocationByInputReducer from 'components/InputField/InputSearchLocation'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  filters: filtersReducer,
  checkbox: checkboxReducer,
  getIdBusStop: getIdBusStopReducer,
  getIdTravelLocation: getIdTravelLocationReducer,
  getLocationByInput: getLocationByInputReducer
})

export default rootReducer
