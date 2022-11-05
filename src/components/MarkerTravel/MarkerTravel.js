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
                <div className="popup-content-custom">
                  <img
                    style={{
                      width: 140,
                      height: 60,
                      borderRadius: '5px',
                      objectFit: 'cover',
                      backgroundPosition: 'center'
                    }}
                    src={i.image}
                    alt={i.imageDesc}
                  />
                  <span style={{ fontSize: '11px', fontWeight: 700 }}>
                    Địa điểm: {i.title}
                  </span>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
    </div>
  )
}

export default MarkerTravel
