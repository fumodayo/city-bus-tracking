import axios from 'axios'
import { MAPBOX_KEY, URI } from './_consts'

class MapBoxAPI {
  async searchLocation(query) {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/Da%20Nang%20${query}.json?access_token=${MAPBOX_KEY}&autocomplete=true&country=vn`
    )
    return res.data
  }

  async getDirection(beginCords, endCords) {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${beginCords[0]},${beginCords[1]};${endCords[0]},${endCords[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_KEY}&language=vi`
    )
    return res.data
  }
}

export default new MapBoxAPI()
