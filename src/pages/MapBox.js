import React, { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { API_KEY_MAPBOX } from 'config/constant'
import mapboxgl from 'mapbox-gl'
import Sidebar from 'layers/Sidebar/Sidebar'

export default function MapBox() {
  // Config mapbox
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(108.2097851153426)
  const [lat, setLat] = useState(16.06045710530602)
  const [zoom, setZoom] = useState(14)

  mapboxgl.accessToken = API_KEY_MAPBOX

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [map.current])

  return (
    <div className="mapbox">
      <div ref={mapContainer} className="map-container"></div>
      <Sidebar />
    </div>
  )
}
