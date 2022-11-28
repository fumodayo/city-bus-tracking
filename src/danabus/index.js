import axios from 'axios'
import { DANA_BUS_LOCAL_HOST } from './_consts'

class DanaBusAPI {
  async getFullBusRoutes() {
    const res = await axios.get(`http://localhost:8017/v1/busroutes`)
    return res.data
  }

  async getFullBusStop() {
    const res = await axios.get(``)
    return res.data
  }

  async getFullTravel() {
    const res = await axios.get(``)
    return res.data
  }

  async getTimeBusStart() {
    const res = await axios.get(``)
    return res.data
  }

  async getInformationBusRoute() {
    const res = await axios.get(``)
    return res.data
  }

  async getRoadMap() {
    const res = await axios.get(``)
    return res.data
  }
}

export default new DanaBusAPI()
