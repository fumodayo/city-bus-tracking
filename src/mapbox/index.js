import axios from 'axios'
import { REACT_APP_MAPBOX_KEY } from './_consts'

class MapBoxAPI {
  async searchLocation(query) {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/Da%20Nang%20${query}.json?access_token=${REACT_APP_MAPBOX_KEY}&autocomplete=true&country=vn`
    )
    return res.data
  }

  async getDirection(beginCords, endCords) {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${beginCords[0]},${beginCords[1]};${endCords[0]},${endCords[1]}?steps=true&geometries=geojson&access_token=${REACT_APP_MAPBOX_KEY}&language=vi`
    )
    return res.data
  }

  async getRoadMap(beginCords, endCords) {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${beginCords[0]},${beginCords[1]};${endCords[0]},${endCords[1]}?steps=true&geometries=geojson&access_token=${REACT_APP_MAPBOX_KEY}&language=vi`
    )
    return res.data
  }

  async getAddress(lng, lat) {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi&access_token=${REACT_APP_MAPBOX_KEY}&language=vi`
    )
    return res.data
  }

  async getIsochroneMap(lng, lat) {
    const res = await axios.get(
      `https://api.mapbox.com/isochrone/v1/mapbox/walking/${lng}%2C${lat}?contours_meters=1000&polygons=true&denoise=1&access_token=${REACT_APP_MAPBOX_KEY}`
    )
    return res.data
  }
}

export default new MapBoxAPI()
