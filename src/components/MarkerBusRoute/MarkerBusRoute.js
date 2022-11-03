import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-map-gl'
import busStop from 'images/icon_busstop.png'
import { useSelector } from 'react-redux'
import { searchTextSelector } from 'redux/selectors'
import { routesData } from 'actions/initialData/routesData'
import './MarkerBusRouter.scss'
import { busStopData } from 'actions/initialData/busStopData'

const MarkerBusRoute = () => {
  const [markerLocation, setMarkerLocation] = useState([])

  const searchRoute = useSelector(searchTextSelector)
  useEffect(() => {
    // filter array by checked & get array codeBusRoute
    const getRoutesCheckBox = searchRoute
      .filter(busroute => busroute.isChecked)
      .map(busroute => busroute.codeBusRoute)

    // get route by code bus route and directionRoute
    const getRouteByCode = routesData.filter(
      marker =>
        getRoutesCheckBox.indexOf(marker.codeBusRoute) !== -1 &&
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

  const [showPopup, setShowPopup] = useState(false)

  const mouseEnter = e => {
    e.preventDefault()
    setShowPopup(true)
  }

  const mouseLeave = e => {
    e.preventDefault()
    setShowPopup(false)
  }

  return (
    <div className="marker-bus-stop">
      {markerLocation.map(marker => (
        <Marker
          key={marker.id}
          latitude={marker.location.lat}
          longitude={marker.location.lng}
          anchor="bottom"
        >
          <img
            style={{ height: 45, width: 30, cursor: 'pointer' }}
            src={busStop}
            alt="marker"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          />
          {showPopup && (
            <Popup
              className="popup-form"
              key={marker.id}
              latitude={marker.location.lat}
              longitude={marker.location.lng}
              anchor="top"
              closeOnClick={false}
              closeButton={false}
            >
              {`Trạm dừng: ${marker.nameBusStop}`}
            </Popup>
          )}
        </Marker>
      ))}
    </div>
  )
}

export default MarkerBusRoute
