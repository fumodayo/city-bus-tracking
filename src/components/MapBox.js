import React, { useEffect, useState } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Source,
  Layer
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { locationData } from '../actions/initialData/locationData'
import { roadMapData } from '../actions/initialData/roadMapData'
import 'mapbox-gl/dist/mapbox-gl.css'
import SideBar from './SideBar/SideBar'
import { Box, IconButton } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import busStop from '../images/icon_busstop.png'

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 16.06045710530602,
    longitude: 108.2097851153426,
    zoom: 17
  })

  const [showPopup, setShowPopup] = useState(false)
  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
  }

  const API_KEY =
    'pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDdjb2ZnY3QxM2F6M3FtaW9zMDFpNWkzIn0.tPFJvhG-HJ0TdmJGolVjHA'

  // const dataLine = {
  //   type: 'Feature',
  //   properties: {},
  //   geometry: {
  //     type: 'LineString',
  //     coordinates: roadMapData
  //   }
  // }

  const [isOpen, setIsOpen] = useState(true)
  const [searchRoute, setSearchRoute] = useState([])

  const [markerLocation, setMarkerLocation] = useState([])

  useEffect(() => {
    const getRoutesCheckBox = searchRoute
      .filter(i => i.isChecked)
      .map(i => i.nameBusRouter)
    const markerLocation = locationData.busRoutes
      .filter(i => {
        return getRoutesCheckBox.indexOf(i.nameBusRouter) !== -1
      })
      .filter(i => i.directionRoute === 'return')
      .map(i => i.route)
    setMarkerLocation(markerLocation)
    console.log(markerLocation.map(i =>
      i.every(i =>typeof(i.name) === 'string')))
  }, [searchRoute])

  return (
    <Map
      {...viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={e => setViewport(e.viewport)}
      mapboxAccessToken={API_KEY}
    >
      <Box sx={{ mr: 1 }}>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight />
        </IconButton>
      </Box>
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchRoute={searchRoute}
        setSearchRoute={setSearchRoute}
      />
      {/* <Source id="polylineLayer" type="geojson" data={dataLine}>
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          layout={{
            'line-join': 'round',
            'line-cap': 'round'
          }}
          paint={{
            'line-color': 'rgb(255, 0, 0)',
            'line-width': 5
          }}
        />
      </Source>
      */}
      {markerLocation &&
        markerLocation.map(i =>
          i.map(i => (
            <Marker
              key={i.id}
              latitude={i.location.lat}
              longitude={i.location.lng}
              anchor="bottom"
            >
              <img
                style={{ height: 40, width: 30, cursor: 'pointer' }}
                src={busStop}
                alt="marker"
                onClick={handleTogglePopup}
              />
              {showPopup && (
                <Popup
                  key={i.id}
                  latitude={i.location.lat}
                  longitude={i.location.lng}
                  anchor="top-right"
                  closeOnClick={false}
                >
                  {i.name}
                </Popup>
              )}
            </Marker>
          ))
        )}
      <NavigationControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
    </Map>
  )
}
