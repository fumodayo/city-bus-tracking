import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import busStop from 'images/icon_busstop.png'
import './MarkerBusStop.scss'

const MarkerBusStop = ({ nameBusStop, locationBusStop }) => {
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
      <Marker
        latitude={locationBusStop?.lat}
        longitude={locationBusStop?.lng}
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
    </div>
  )
}

export default MarkerBusStop
