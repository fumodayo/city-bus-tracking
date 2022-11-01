import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { roadMapData } from 'actions/initialData/roadMapData'
import { useSelector } from 'react-redux'
import { searchTextSelector } from 'redux/selectors'

const PolyLines = () => {
  const [allDataLineRoutes, setAllDataLineRoutes] = useState([])
  const searchRoutes = useSelector(searchTextSelector)

  useEffect(() => {
    const getRoutesCheckBox = searchRoutes
      .filter(i => i.isChecked)
      .map(i => i.nameBusRouter)

    const getRoutesLine = roadMapData
      .filter(
        i => getRoutesCheckBox.indexOf(i.name) !== -1 && i.directionRoute === 'turn'
      )
      .map(i => {
        return {
          type: 'Feature',
          color: i.color,
          name: i.name,
          directionRoute: i.directionRoute,
          geometry: {
            type: 'LineString',
            coordinates: i.lineRoute
          }
        }
      })

    setAllDataLineRoutes(getRoutesLine)
  }, [searchRoutes])

  return (
    <div className="polyline">
      {allDataLineRoutes.map((item, index) => (
        <Source key={index} id="polylineLayer" type="geojson" data={item}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': item.color,
              'line-width': 5
            }}
          />
        </Source>
      ))}
    </div>
  )
}

export default PolyLines
