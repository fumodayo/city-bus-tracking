import { configureStore } from '@reduxjs/toolkit'
import routesReducer from './slices/routes'

const store = configureStore({
  reducer: {
    routes: routesReducer
  }
})

export default store
