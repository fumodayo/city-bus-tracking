import { locationTravelData } from 'actions/initialData/locationTravelData'
import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import './MarkerTravel.scss'
import MarkerTravelImage from 'components/MarkerTravelImages/MarkerTravelImage'
import { useSelector } from 'react-redux'
import { checkboxTravelSelector } from 'redux/selectors'
import MarkerTypeTravel from 'components/MarkerTypeTravel/MarkerTypeTravel'

const MarkerTravel = () => {
  const isCheckedTravel = useSelector(checkboxTravelSelector)
  return (
    <div className="marker-travel">
      {isCheckedTravel &&
        locationTravelData.map(travel => (
          <MarkerTypeTravel
            name={travel.title}
            typeLocation={travel.typeLocation}
            image={travel.image}
            imageDesc={travel.imageDesc}
            location={travel.location}
          />
        ))}
    </div>
  )
}

export default MarkerTravel
