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
    // validation route
    // console.log(markerLocation.map(i =>
    //   i.every(i =>typeof(i.name) === 'string')))
  }, [searchRoute])

  const [allBusStop, setAllBusStop] = useState([])
  useEffect(() => {
    const handleGetAllBusStop = () => {
      const getAllBusStopInRoutes = locationData.busRoutes.map(i => i.route)
      let allDataBusStop = []
      allDataBusStop = [...allDataBusStop, getAllBusStopInRoutes].flat(2)
      return allDataBusStop
    }
    const getData = handleGetAllBusStop()
    setAllBusStop(getData)
  }, [allBusStop])

  const [allDataLineRoutes, setAllDataLineRoutes] = useState([])
  useEffect(() => {
    const getRoutesCheckBox = searchRoute
      .filter(i => i.isChecked)
      .map(i => i.nameBusRouter)

    const handleGetAllDataLineRoutes = () => {
      const getRoutesLine = roadMapData
        .filter(
          i =>
            getRoutesCheckBox.indexOf(i.name) !== -1 &&
            i.directionRoute === 'turn'
        )
        .map(i => {
          return {
            type: 'Feature',
            properties: {},
            color: i.color,
            name: i.name,
            directionRoute: i.directionRoute,
            geometry: {
              type: 'LineString',
              coordinates: i.lineRoute
            }
          }
        })
      return getRoutesLine
    }
    const getData = handleGetAllDataLineRoutes()
    setAllDataLineRoutes(getData)
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
        allBusStop={allBusStop}
      />

      {allDataLineRoutes &&
        allDataLineRoutes.map(i => (
          <Source id="polylineLayer" type="geojson" data={i}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                'line-color': i.color,
                'line-width': 5
              }}
            />
          </Source>
        ))}

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
