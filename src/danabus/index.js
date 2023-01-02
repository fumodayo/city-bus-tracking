import axios from 'axios'
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess
} from 'redux/slices/auth'
import { API_ROOT } from './_consts'

class DanaBusAPI {
  async loginUser(user, dispatch, navigate) {
    dispatch(loginStart())
    try {
      const res = await axios.post(`${API_ROOT}/v1/auth/login`, user)
      dispatch(loginSuccess(res.data))
      navigate('/dashboard')
    } catch (err) {
      dispatch(loginFailed)
    }
  }

  async logOut(dispatch, id, navigate, accessToken, axiosJWT) {
    dispatch(logoutStart())
    try {
      await axiosJWT.post(`${API_ROOT}/v1/auth/logout`, id, {
        headers: { token: `Bearer ${accessToken}` }
      })
      dispatch(logoutSuccess())
      navigate('/')
    } catch (err) {
      dispatch(logoutFailed())
    }
  }

  /**Bus routes */
  async getFullBusRoutes() {
    const res = await axios.get(`${API_ROOT}/v1/busroutes`)
    return res.data
  }

  async createBusRoute(data) {
    const res = await axios.post(`${API_ROOT}/v1/busroutes/create`, data)
    return res.data
  }

  async updatedBusRoute(id, data) {
    const res = await axios.put(`${API_ROOT}/v1/busroutes/${id}`, data)
    return res.data
  }

  /**Bus Stops */
  async getFullBusStop() {
    const res = await axios.get(`${API_ROOT}/v1/busstops`)
    return res.data
  }

  async createOneBusStop(data) {
    const res = await axios.post(`${API_ROOT}/v1/busstops/createOne`, data)
    return res.data
  }

  async createManyBusStops(data) {
    const res = await axios.post(`${API_ROOT}/v1/busstops/create`, data)
    return res.data
  }

  async updatedBusStop(id, data) {
    const res = await axios.put(`${API_ROOT}/v1/busstops/${id}`, data)
    return res.data
  }

  async removeBusStop(id) {
    const res = await axios.delete(`${API_ROOT}/v1/busstops/${id}`)
    return res.data
  }

  /**Travels */
  async getFullTravel() {
    const res = await axios.get(`${API_ROOT}/v1/travels`)
    return res.data
  }

  async createManyTravels(data) {
    const res = await axios.post(`${API_ROOT}/v1/travels/create`, data)
    return res.data
  }

  /**Time Bus Start */
  async getTimeBusStart() {
    const res = await axios.get(`${API_ROOT}/v1/timebusstart`)
    return res.data
  }

  async createTimeBusStart(data) {
    const res = await axios.post(`${API_ROOT}/v1/timebusstart/create`, data)
    return res.data
  }

  /** INFO BUS ROUTE */
  async getInformationBusRoute() {
    const res = await axios.get(`${API_ROOT}/v1/infobusroute`)
    return res.data
  }

  async updatedInformationBusRoute(id, data) {
    const res = await axios.put(`${API_ROOT}/v1/infobusroute/${id}`, data)
    return res.data
  }

  /** ROAD MAP */
  async getRoadMap() {
    const res = await axios.get(`${API_ROOT}/v1/roadroutes`)
    return res.data
  }

  async updatedRoadMap(id, data) {
    const res = await axios.put(`${API_ROOT}/v1/roadroutes/${id}`, data)
    return res.data
  }
}

export default new DanaBusAPI()
