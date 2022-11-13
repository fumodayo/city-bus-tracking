import MarkerTravelImage from 'components/MarkerTravelImages/MarkerTravelImage'
import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'

const MarkerTypeTravel = ({
  location,
  name,
  image,
  imageDesc,
  typeLocation
}) => {
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
    <div>
      <Marker
        latitude={location?.lat}
        longitude={location?.lng}
        anchor="bottom"
      >
        <MarkerTravelImage
          mouseEnter={mouseEnter}
          mouseLeave={mouseLeave}
          typeLocation={typeLocation}
        />
        {showPopup && (
          <Popup
            className="popup-form"
            latitude={location?.lat}
            longitude={location?.lng}
            anchor="top"
            closeOnClick={false}
            closeButton={false}
            style={{
              maxWidth: 240,
              maxHeight: 200,
              padding: 0,
              margin: 0
            }}
          >
            <div className="popup-content-custom">
              <img
                style={{
                  width: 236,
                  height: 100,
                  borderRadius: '5px',
                  objectFit: 'cover',
                  backgroundPosition: 'center'
                }}
                src={image}
                alt={imageDesc}
              />
              <span style={{ fontSize: '11px', fontWeight: 700 }}>
                Địa điểm: {name}
              </span>
            </div>
          </Popup>
        )}
      </Marker>
    </div>
  )
}

export default MarkerTypeTravel
