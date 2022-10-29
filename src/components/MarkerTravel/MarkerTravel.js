import { locationTravelData } from 'actions/initialData/locationTravelData'
import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import './MarkerTravel.scss'
import MarkerTravelImage from 'components/MarkerTravelImages/MarkerTravelImage'
import { useSelector } from 'react-redux'
import { checkboxTravelChange } from 'redux/actions'

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

  const isCheckedTravel = useSelector(checkboxTravelChange)

  return (
    <div className="marker-travel">
      {isCheckedTravel.payload.checkbox &&
        locationTravelData.map(i => (
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
