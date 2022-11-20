import MarkerTravelImage from 'components/BusRoutes/MarkerTravelImage'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Marker, Popup } from 'react-map-gl'
import { useDispatch } from 'react-redux'
import { setShowSidebarTravel } from 'redux/slices/form'
import SidebarTravel from './SidebarTravel'

const MarkerTypeTravel = ({
  id,
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

  const [idItem, setIdItem] = useState('')
  const onClick = e => {
    setIdItem(e.target.id)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setShowSidebarTravel({ isShowSidebar: true, idTravelLocation: idItem })
    )
  }, [idItem])
  console.log(idItem)
  return (
    <div>
      <Marker
        latitude={location?.lat}
        longitude={location?.lng}
        anchor="bottom"
      >
        <MarkerTravelImage
          id={id}
          mouseEnter={mouseEnter}
          mouseLeave={mouseLeave}
          typeLocation={typeLocation}
          onClick={onClick}
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
      {idItem && <SidebarTravel />}
    </div>
  )
}

export default MarkerTypeTravel
