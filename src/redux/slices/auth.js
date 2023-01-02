import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.login.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false
      state.login.currentUser = action.payload
      state.login.error = false
    },
    loginFailed: state => {
      state.login.error = true
    },
    logoutStart: state => {
      state.login.isFetching = true
    },
    logoutSuccess: state => {
      state.login.isFetching = false
      state.login.currentUser = null
      state.login.error = false
    },
    logoutFailed: state => {
      state.login.error = true
      state.login.isFetching = false
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed
} = authSlice.actions

export default authSlice.reducer
