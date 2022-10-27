import React, { useEffect, useState } from 'react'
import { locationData } from 'actions/initialData/locationData'

const RouteThrough = ({ nameBusStop }) => {
  const [routeThrough, setRouteThrough] = useState([])

  useEffect(() => {
    const objAfterFilter = locationData.map(i =>
      i.route.filter(i => i.name === nameBusStop)
    )

    // Clear empty obj
    Object.keys(objAfterFilter).forEach(
      key => objAfterFilter[key] === undefined && delete objAfterFilter[key]
    )

    const busroutename = objAfterFilter.flat().map(i => i.nameLocationBusRoute)[0]
    const busroutedirection = objAfterFilter
      .flat()
      .map(i => i.directionLocationBusRoute)[0]

    const dataRoute = locationData.filter(
      i => i.nameBusRouter === busroutename && i.directionRoute === busroutedirection
    )[0]

    setRouteThrough(dataRoute)
  }, [nameBusStop])

  return (
    <div className="route-through">
      <div className="scroll-content">
        <div style={{ cursor: 'pointer' }} className="row align-items-center h-100">
          <div className="small-3">
            <div
              className="route-no text-center"
              style={{ background: `${routeThrough.color}` }}
            >
              <span>{routeThrough.nameBusRouter}</span>
            </div>
          </div>

          <div className="small-7">
            <p className="code-route">{routeThrough.name}</p>
            <p className="code-desc" style={{ fontSize: '14.5px', color: '#1F8BAE' }}>
              {routeThrough.directionRoute === 'turn' ? 'Chiều đi' : 'Chiều về'}
            </p>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  )
}

export default RouteThrough
