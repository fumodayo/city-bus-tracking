import React from 'react'
import { Layer, Source } from 'react-map-gl'

const PolylineBusRoute = ({ lineMap }) => {
  return (
    <div>
      {lineMap?.features?.map(art => (
        <Source id="polylineLayer" type="geojson" data={lineMap}>
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

export default PolylineBusRoute
