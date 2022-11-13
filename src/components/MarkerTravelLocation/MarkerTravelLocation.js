import React from 'react'
import { locationTravelData } from 'actions/initialData/locationTravelData'
import { useSelector } from 'react-redux'
import MarkerTypeTravel from 'components/MarkerTypeTravel/MarkerTypeTravel'
import './MarkerTravelLocation.scss'

const MarkerTravelLocation = () => {
  const isCheckedTravel = useSelector(state => state.routes.checkboxTravel)

  return (
    <>
      {isCheckedTravel &&
        locationTravelData.map((travel, index) => (
          <div className="marker-travel" key={index}>
            <MarkerTypeTravel
              name={travel.title}
              typeLocation={travel.typeLocation}
              image={travel.image}
              imageDesc={travel.imageDesc}
              location={travel.location}
            />
          </div>
        ))}
    </>
  )
}

export default MarkerTravelLocation
