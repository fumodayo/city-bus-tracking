import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { roadMapData } from 'actions/initialData/roadMapData'
import { useSelector } from 'react-redux'
import { searchTextSelector } from 'redux/selectors'
import PolylineBusRoute from 'components/PolylineBusRoute/PolylineBusRoute'

const PolyLines = () => {
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
    console.log(geojson)
    setAllDataLineRoutes(geojson)
  }, [searchRoutes])

  return (
    <div className="polyline">
      <PolylineBusRoute lineMap={allDataLineRoutes} />
    </div>
  )
}

export default PolyLines
