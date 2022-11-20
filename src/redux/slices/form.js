import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarTravel: {
    isShowSidebar: false,
    idTravelLocation: ''
  },
  sidebarBusStopInLine: {
    isShowSidebar: false
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setShowSidebarTravel: (state, action) => {
      state.sidebarTravel = action.payload
    },
    setShowSidebarBusStopInLine: (state, action) => {
      state.sidebarBusStopInLine = action.payload
    }
  }
})

export const { setShowSidebarTravel, setShowSidebarBusStopInLine } =
  formSlice.actions

export default formSlice.reducer
