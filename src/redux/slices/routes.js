import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: [''],
  checkboxTravel: false,
  idBusStop: '',
  idTravel: '',
  direction: {
    id: '',
    location: []
  },
  location: {
    lng: 0,
    lat: 0
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
    },
    setUpdateLocation: (state, action) => {
      state.location = action.payload
    }
  }
})

export const {
  setFilterRoutes,
  setCheckboxTravel,
  setIDBusStop,
  setIDTravel,
  setSearchLocation,
  setUpdateLocation
} = routesSlice.actions

export default routesSlice.reducer
