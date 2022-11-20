import { configureStore } from '@reduxjs/toolkit'
import routesReducer from './slices/routes'
import formSlice from './slices/form'

const store = configureStore({
  reducer: {
    routes: routesReducer,
    form: formSlice
  }
})

export default store
