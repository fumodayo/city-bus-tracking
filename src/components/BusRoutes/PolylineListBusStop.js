import React, { useEffect, useState } from 'react'
import { Layer, Source } from 'react-map-gl'
import MarkerBusStop from 'components/Common/MarkerBusStop/MarkerBusStop'
import { useBusStop } from 'hooks/useBusStop'
import { useRoad } from 'hooks/useRoad'

const PolylineListBusStop = ({ nameCodeRoute, turnRoute }) => {
  const busStop = useBusStop()
  const road = useRoad()
  const [artLineRoute, setArtLineRoute] = useState({})
  const [locationMarker, setLocationMarker] = useState([])
  useEffect(() => {
    let getRoutesLine = road
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
      })

    const geojson = {
      type: 'FeatureCollection',
      features: [...getRoutesLine, getRoutesLine].pop()
    }
    setArtLineRoute(geojson)

    const listMarkerData = busStop.filter(
      busstop =>
        busstop.codeBusRoute === nameCodeRoute &&
        busstop.directionRoute === turnRoute
    )
    setLocationMarker(listMarkerData)
  }, [nameCodeRoute, turnRoute, busStop, road])

  return (
    <>
      {artLineRoute &&
        artLineRoute?.features?.map((art, index) => (
          <div className="polyline-list-bus-stop" key={index}>
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
                  'line-color': `${art?.color}`,
                  'line-width': 5
                }}
              />
            </Source>
          </div>
        ))}
      {locationMarker?.map(marker => (
        <MarkerBusStop
          key={marker.id}
          nameBusStop={marker.nameBusStop}
          locationBusStop={marker.location}
        />
      ))}
    </>
  )
}

export default PolylineListBusStop
