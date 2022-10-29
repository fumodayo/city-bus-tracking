import { locationTravelData } from 'actions/initialData/locationTravelData'
import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import './MarkerTravel.scss'
import MarkerTravelImage from 'components/MarkerTravelImages/MarkerTravelImage'

const MarkerTravel = () => {
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
    <div className="marker-travel">
      {locationTravelData.map(i => (
        <Marker
          key={i.id}
          latitude={i.location.lat}
          longitude={i.location.lng}
          anchor="bottom"
        >
          <MarkerTravelImage
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
            typeLocation={i.typeLocation}
          />
          {showPopup && (
            <Popup
              className="popup-form"
              key={i.id}
              latitude={i.location.lat}
              longitude={i.location.lng}
              anchor="top"
              closeOnClick={false}
              closeButton={false}
            >
              {`Địa điểm: ${i.title}`}
            </Popup>
          )}
        </Marker>
      ))}
    </div>
  )
}

export default MarkerTravel
