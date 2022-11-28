import axios from 'axios'
import { API_ROOT } from './_consts'

class DanaBusAPI {
  async getFullBusRoutes() {
    const res = await axios.get(`${API_ROOT}/v1/busroutes`)
    return res.data
  }

  async getFullBusStop() {
    const res = await axios.get(`${API_ROOT}/v1/busstops`)
    return res.data
  }

  async getFullTravel() {
    const res = await axios.get(`${API_ROOT}/v1/travels`)
    return res.data
  }

  async getTimeBusStart() {
    const res = await axios.get(`${API_ROOT}/v1/timebusstart`)
    return res.data
  }

  async getInformationBusRoute() {
    const res = await axios.get(`${API_ROOT}/v1/infobusroutes`)
    return res.data
  }

  async getRoadMap() {
    const res = await axios.get(`${API_ROOT}/v1/roadroutes`)
    return res.data
  }
}

export default new DanaBusAPI()
