import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { useSelector } from 'react-redux'
import { useRoad } from 'hooks/useRoad'

const PolylineBusRoutes = () => {
  const road = useRoad()
  const [allDataLineRoutes, setAllDataLineRoutes] = useState([])
  const searchRoutes = useSelector(state => state.routes.filters)

  useEffect(() => {
    const getRoutesLine = road
      .filter(
        route =>
          searchRoutes.indexOf(route.codeBusRoute) !== -1 &&
          route.directionRoute === 'turn'
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
    setAllDataLineRoutes(geojson)
  }, [searchRoutes])

  return (
    <>
      {allDataLineRoutes?.features?.map((art, index) => (
        <div className="polyline" key={index}>
          <Source id="polylineLayer" type="geojson" data={allDataLineRoutes}>
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
    </>
  )
}

export default PolylineBusRoutes
