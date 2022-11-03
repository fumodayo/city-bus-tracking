import React, { useState } from 'react'
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PolyLines from '../components/Polylines/Polylines'
import MarkerBusRoute from 'components/MarkerBusRoute/MarkerBusRoute'
import { API_KEY_MAPBOX } from 'config/constant'
import Sidebar from 'components/Sidebar/Sidebar'
import MarkerTravel from 'components/MarkerTravel/MarkerTravel'
import { DEFAULT_MAPBOX_LOCATION } from 'utilities/constants'
import { routesData } from 'actions/initialData/routesData'

export default function MapBox() {
  const [viewport, setViewport] = useState(DEFAULT_MAPBOX_LOCATION)
  const _onViewportChange = e => setViewport(e.viewport)
  const data = {
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
  }

  // console.log(
  //   routesData
  //     .map(i => i.route.filter(i => i.id === '41676731701')[0])
  //     .filter(n => n)[0]
  // )

  return (
    <Map
      {...viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={_onViewportChange}
      mapboxAccessToken={API_KEY_MAPBOX}
    >
      <Sidebar />
       <PolyLines />
      <MarkerBusRoute />
      
      <MarkerTravel />
      <NavigationControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <GeolocateControl
        data={data}
        onGeolocate={e => console.log(e.target._map._markers[0]._lngLat)}
        position="bottom-right"
      />
    </Map>
  )
}
