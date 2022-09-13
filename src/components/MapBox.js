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

  const dataLine = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: roadMapData
    }
  }

  const [isOpen, setIsOpen] = useState(true)

  const [markerLocation, setMarkerLocation] = useState([])
  const [checkedRoute, setCheckedRoute] = useState('R4A')

  useEffect(() => {
    const markerLocation = locationData.busRoutes.find(
      i => i.nameBusRouter === checkedRoute
    ).route
    if(markerLocation)
    setMarkerLocation(markerLocation)
  }, [checkedRoute])

  console.log(checkedRoute)
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
        checkedRoute={checkedRoute}
        setCheckedRoute={setCheckedRoute}
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
        markerLocation.map(i => (
          <Marker
            key={i.id}
            latitude={i.location.lat}
            longitude={i.location.lng}
            anchor="bottom"
          >
            <img
              style={{ height: 50, width: 50, cursor: 'pointer' }}
              src="https://ecobus.danang.gov.vn/images/markerred.png"
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
        ))}
      <NavigationControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
    </Map>
  )
}
