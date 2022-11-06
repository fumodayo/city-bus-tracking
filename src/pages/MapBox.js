import React, { useEffect, useState } from 'react'
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
import { busStopData } from 'actions/initialData/busStopData'
import { useSelector } from 'react-redux'
import {
  getIdsBusStopSelector,
  getIdsTravelLocationSelector
} from 'redux/selectors'
import { locationTravelData } from 'actions/initialData/locationTravelData'

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 16.06045710530602,
    longitude: 108.2097851153426,
    zoom: 14
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

  // Get id bus stop in all bus stop and move in the location on map
  const getIdBusStop = useSelector(getIdsBusStopSelector)
  useEffect(() => {
    const busstopFilterById = busStopData
      .filter(busstop => busstop.id === getIdBusStop)
      .map(busstop => {
        return {
          latitude: busstop.location.lat,
          longitude: busstop.location.lng,
          zoom: 16
        }
      })[0]
    setViewport(busstopFilterById)
  }, [getIdBusStop])

  // Get id location travel in all information travel and move in the location on map
  const getIdTravelLocation = useSelector(getIdsTravelLocationSelector)
  useEffect(() => {
    const locationTravelFilterById = locationTravelData
      .filter(travel => travel.id === getIdTravelLocation)
      .map(travel => {
        return {
          latitude: travel.location.lat,
          longitude: travel.location.lng,
          zoom: 16
        }
      })[0]
    setViewport(locationTravelFilterById)
  }, [getIdTravelLocation])

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
