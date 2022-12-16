import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import busStop from 'images/icon_busstop.png'
import './MarkerBusStop.scss'
import CustomSidebar from '../CustomSidebar'
import BusLocation from 'components/BusRoutes/BusLocation'
import RouteThrough from 'components/BusRoutes/RouteThrough'

const MarkerBusStop = ({ nameBusStop, locationBusStop, idBusStop }) => {
  const [showPopup, setShowPopup] = useState(false)

  const mouseEnter = e => {
    e.preventDefault()
    setShowPopup(true)
  }

  const mouseLeave = e => {
    e.preventDefault()
    setShowPopup(false)
  }

  const [showSidebar, setShowSidebar] = useState(false)
  const [getIdBusStop, setIdBusStop] = useState('')
  const handleHaveIdShowSidebar = e => {
    setIdBusStop(e.target.id)
    setShowSidebar(true)
  }

  return (
    <div className="marker-bus-stop">
      <Marker
        latitude={locationBusStop?.lat}
        longitude={locationBusStop?.lng}
        anchor="bottom"
      >
        <img
          style={{ height: 45, width: 30, cursor: 'pointer' }}
          src={busStop}
          id={idBusStop}
          onClick={handleHaveIdShowSidebar}
          alt="marker"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        />
        {showPopup && (
          <Popup
            className="popup-form"
            latitude={locationBusStop?.lat}
            longitude={locationBusStop?.lng}
            anchor="top"
            closeOnClick={false}
            closeButton={false}
          >
            {`Trạm dừng: ${nameBusStop}`}
          </Popup>
        )}
      </Marker>
      {getIdBusStop && (
        <CustomSidebar
          show={showSidebar}
          name={`Trạm dừng: ${nameBusStop}`}
          tabLeft={'Xe sắp tới trạm'}
          tabRight={'Tuyến đi qua'}
          compLeft={<BusLocation idBusStop={getIdBusStop} />}
          compRight={<RouteThrough idBusStop={getIdBusStop} />}
        />
      )}
    </div>
  )
}

export default MarkerBusStop
