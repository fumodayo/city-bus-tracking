import React from 'react'
import { locationTravelData } from 'actions/initialData/locationTravelData'
import { useSelector } from 'react-redux'
import { checkboxTravelSelector } from 'redux/selectors'
import MarkerTypeTravel from 'components/MarkerTypeTravel/MarkerTypeTravel'
import './MarkerTravelLocation.scss'

const MarkerTravelLocation = () => {
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

export default MarkerTravelLocation
