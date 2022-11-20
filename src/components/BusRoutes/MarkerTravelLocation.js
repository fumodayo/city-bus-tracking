import React from 'react'
import { useSelector } from 'react-redux'
import MarkerTypeTravel from 'components/BusRoutes/MarkerTypeTravel'
import { useTravel } from 'hooks/useTravel'
import './MarkerTravelLocation.scss'

const MarkerTravelLocation = () => {
  const travels = useTravel()
  const isCheckedTravel = useSelector(state => state.routes.checkboxTravel)

  return (
    <>
      {isCheckedTravel &&
        travels.map((travel, index) => (
          <div className="marker-travel" key={index}>
            <MarkerTypeTravel
              id={travel.id}
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
