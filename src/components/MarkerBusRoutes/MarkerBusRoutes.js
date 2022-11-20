import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MarkerBusStop from 'components/Common/MarkerBusStop/MarkerBusStop'
import { useBusRoutes } from 'hooks/useBusRoutes'
import { useBusStop } from 'hooks/useBusStop'
import './MarkerBusRoutes.scss'

const MarkerBusRoutes = () => {
  const busStop = useBusStop()
  const routes = useBusRoutes()

  const [markerLocation, setMarkerLocation] = useState([])

  const searchRoute = useSelector(state => state.routes.filters)

  useEffect(() => {
    // get route by code bus route and directionRoute
    const getRouteByCode = routes.filter(
      marker =>
        searchRoute.indexOf(marker.codeBusRoute) !== -1 &&
        marker.directionRoute === 'turn'
    )

    // get array codeBusRoute
    const getCodeMarkerRoute = getRouteByCode.map(
      busstop => busstop.codeBusRoute
    )

    // get array directionRoute
    const getDirectionMarkerRoute = getRouteByCode.map(
      busstop => busstop.directionRoute
    )

    // get all marker by compare array codeBusRoute & directionRoute
    const getAllMarkerToBusStop = busStop.filter(
      busstop =>
        getDirectionMarkerRoute.indexOf(busstop.directionRoute) !== -1 &&
        getCodeMarkerRoute.indexOf(busstop.codeBusRoute) !== -1
    )

    setMarkerLocation(getAllMarkerToBusStop)

    // validation route

    // console.log(markerLocation.map(i =>
    //   i.every(i =>typeof(i.name) === 'string')))
  }, [searchRoute, routes, busStop])

  return (
    <>
      {markerLocation.map((marker, index) => (
        <div className="marker-bus-stop" key={index}>
          <MarkerBusStop
            nameBusStop={marker.nameBusStop}
            locationBusStop={marker.location}
            idBusStop={marker.id}
          />
        </div>
      ))}
    </>
  )
}

export default MarkerBusRoutes
