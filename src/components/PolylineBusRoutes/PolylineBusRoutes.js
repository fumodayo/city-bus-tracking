import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { roadMapData } from 'actions/initialData/roadMapData'
import { useSelector } from 'react-redux'
import { searchTextSelector } from 'redux/selectors'

const PolylineBusRoutes = () => {
  const [allDataLineRoutes, setAllDataLineRoutes] = useState([])
  const searchRoutes = useSelector(searchTextSelector)

  useEffect(() => {
    // filter array by checked & get array codeBusRoute
    const getRoutesCheckBox = searchRoutes
      .filter(busroute => busroute.isChecked)
      .map(busroute => busroute.codeBusRoute)

    const getRoutesLine = roadMapData
      .filter(
        route =>
          getRoutesCheckBox.indexOf(route.codeBusRoute) !== -1 &&
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
    <div className="polyline">
      {allDataLineRoutes?.features?.map(art => (
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
      ))}
    </div>
  )
}

export default PolylineBusRoutes
