import { locationTravelData } from 'actions/initialData/locationTravelData'
import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import './MarkerTravel.scss'
import MarkerTravelImage from 'components/MarkerTravelImages/MarkerTravelImage'
import { useSelector } from 'react-redux'
import { checkboxTravelSelector } from 'redux/selectors'

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

  const isCheckedTravel = useSelector(checkboxTravelSelector)
  console.log(isCheckedTravel)

  return (
    <div className="marker-travel">
      {isCheckedTravel &&
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
