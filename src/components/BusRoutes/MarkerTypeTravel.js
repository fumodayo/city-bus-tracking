import { Grid } from '@mui/material'
import MarkerTravelImage from 'components/BusRoutes/MarkerTravelImage'
import HTMLReactParser from 'html-react-parser'
import React, { useState } from 'react'
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
  typeLocation,
  description
}) => {
  const [showPopup, setShowPopup] = useState(false)

  const mouseEnter = e => {
    setShowPopup(true)
  }

  const mouseLeave = e => {
    setShowPopup(false)
  }

  const [idItem, setIdItem] = useState('')
  const dispatch = useDispatch()
  const onClick = e => {
    setIdItem(e.target.id)
    dispatch(
      setShowSidebarTravel({ isShowSidebar: true, idTravelLocation: idItem })
    )
  }

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
            mouseEnter={mouseEnter}
            latitude={location?.lat}
            longitude={location?.lng}
            anchor="top"
            closeOnClick={false}
            closeButton={false}
            style={{
              minWidth: 300,
              minHeight: 150,
              maxWidth: 300,
              maxHeight: 300,
              padding: 0,
              margin: 0
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <h1
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '20px'
                  }}
                >
                  {name}
                </h1>
                <p
                  style={{
                    width: '150px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    lineHeight: '25px',
                    height: '75px',
                    fontSize: '12px',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    fontWeight: 100
                  }}
                >
                  {HTMLReactParser(description)}
                </p>
              </Grid>
              <Grid item xs={6}>
                <img
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '5px',
                    objectFit: 'cover',
                    boxShadow:
                      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                  }}
                  src={image}
                  alt={imageDesc}
                />
              </Grid>
            </Grid>
          </Popup>
        )}
      </Marker>
      {idItem && <SidebarTravel />}
    </div>
  )
}

export default MarkerTypeTravel
