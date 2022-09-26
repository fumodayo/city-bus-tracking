import React, { useState } from 'react'
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box, IconButton } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import PolyLines from '../components/Polylines/Polylines'
import MarkerBusStop from '../components/MarkerBusStop/MarkerBusStop'
import SideBar from '../components/SideBar/SideBar'
import { API_KEY_MAPBOX, MAP_BOX_DEFAULT } from 'config/constant'

export default function MapBox() {
  const [viewport, setViewport] = useState(MAP_BOX_DEFAULT)

  const [isOpen, setIsOpen] = useState(true)
  
  const [searchRoute, setSearchRoute] = useState([])

  return (
    <Map
      {...viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={e => setViewport(e.viewport)}
      mapboxAccessToken={API_KEY_MAPBOX}
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

      <PolyLines searchRoute={searchRoute} />

      <MarkerBusStop searchRoute={searchRoute} />

      <NavigationControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
    </Map>
  )
}
