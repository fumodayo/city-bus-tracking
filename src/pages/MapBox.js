import React, { useState } from 'react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PolyLines from '../components/Polylines/Polylines'
import MarkerBusRoute from 'components/MarkerBusRoute/MarkerBusRoute'
import { API_KEY_MAPBOX } from 'config/constant'
import Sidebar from 'components/Sidebar/Sidebar'
import MarkerTravel from 'components/MarkerTravel/MarkerTravel'

export default function MapBox() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 16.06045710530602,
    longitude: 108.2097851153426,
    zoom: 12.721197192553936
  })
  const _onViewportChange = e => setViewport(e.viewport)
  const data = {
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
  }
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
