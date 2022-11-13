import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { routesData } from 'actions/initialData/routesData'
import { busStopData } from 'actions/initialData/busStopData'
import MarkerBusStop from 'components/Common/MarkerBusStop/MarkerBusStop'
import './MarkerBusRoutes.scss'

const MarkerBusRoutes = () => {
  const [markerLocation, setMarkerLocation] = useState([])

  const searchRoute = useSelector(state => state.routes.filters)

  useEffect(() => {
    // get route by code bus route and directionRoute
    const getRouteByCode = routesData.filter(
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
    const getAllMarkerToBusStop = busStopData.filter(
      busstop =>
        getDirectionMarkerRoute.indexOf(busstop.directionRoute) !== -1 &&
        getCodeMarkerRoute.indexOf(busstop.codeBusRoute) !== -1
    )

    setMarkerLocation(getAllMarkerToBusStop)

    // validation route

    // console.log(markerLocation.map(i =>
    //   i.every(i =>typeof(i.name) === 'string')))
  }, [searchRoute])

  return (
    <>
      {markerLocation.map((marker, index) => (
        <div className="marker-bus-stop" key={index}>
          <MarkerBusStop
            nameBusStop={marker.nameBusStop}
            locationBusStop={marker.location}
          />
        </div>
      ))}
    </>
  )
}

export default MarkerBusRoutes
