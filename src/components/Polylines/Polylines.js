import React, { useState, useEffect, useContext } from 'react'
import { Source, Layer } from 'react-map-gl'
import { roadMapData } from 'actions/initialData/roadMapData'

const PolyLines = ({ searchRoute }) => {

  const [allDataLineRoutes, setAllDataLineRoutes] = useState([])

  useEffect(() => {
    const getRoutesCheckBox = searchRoute
      .filter(i => i.isChecked)
      .map(i => i.nameBusRouter)

    const getRoutesLine = roadMapData
      .filter(
        i =>
          getRoutesCheckBox.indexOf(i.name) !== -1 &&
          i.directionRoute === 'turn'
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
  }, [searchRoute])

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