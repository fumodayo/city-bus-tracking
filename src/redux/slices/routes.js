import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: [''],
  checkboxTravel: false,
  idBusStop: '',
  idTravel: '',
  direction: {
    id: '',
    location: []
  }
}

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setFilterRoutes: (state, action) => {
      state.filters = action.payload
    },
    setCheckboxTravel: (state, action) => {
      state.checkboxTravel = action.payload
    },
    setIDBusStop: (state, action) => {
      state.idBusStop = action.payload
    },
    setIDTravel: (state, action) => {
      state.idTravel = action.payload
    },
    setSearchLocation: (state, action) => {
      state.direction = action.payload
    }
  }
})

export const {
  setFilterRoutes,
  setCheckboxTravel,
  setIDBusStop,
  setIDTravel,
  setSearchLocation
} = routesSlice.actions

export default routesSlice.reducer
