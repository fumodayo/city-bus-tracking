import { roadMapData } from 'actions/initialData/roadMapData'
import React, { useEffect, useState } from 'react'
import { Layer, Source } from 'react-map-gl'
import { busStopData } from 'actions/initialData/busStopData'
import MarkerBusStop from 'components/MarkerBusStop/MarkerBusStop'

const PolylineListBusStop = ({ nameCodeRoute, turnRoute }) => {
  const [artLineRoute, setArtLineRoute] = useState({})
  const [locationMarker, setLocationMarker] = useState([])
  useEffect(() => {
    const getRoutesLine = roadMapData
      .filter(
        route =>
          route.codeBusRoute === nameCodeRoute &&
          route.directionRoute === turnRoute
      )
      .map(lineroute => {
        return {
          type: 'Feature',
          color: lineroute.colorRoute,
          name: lineroute.codeBusRoute,
          directionRoute: lineroute.directionRoute,
          geometry: {
            type: 'LineString',
            coordinates: lineroute.lineRoute
          }
        }
      })[0]
    setArtLineRoute(getRoutesLine)

    const listMarkerData = busStopData.filter(
      busstop =>
        busstop.codeBusRoute === nameCodeRoute && busstop.directionRoute
    )
    setLocationMarker(listMarkerData)
  }, [nameCodeRoute, turnRoute])

  return (
    <div className="polyline-list-bus-stop">
      {artLineRoute && (
        <Source id="polylineLayer" type="geojson" data={artLineRoute}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': artLineRoute.color,
              'line-width': 5
            }}
          />
        </Source>
      )}
      {locationMarker?.map(marker => (
        <MarkerBusStop
          nameBusStop={marker.nameBusStop}
          locationBusStop={marker.location}
        />
      ))}
    </div>
  )
}

export default PolylineListBusStop
