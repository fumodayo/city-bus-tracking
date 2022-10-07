import React, { useState, useEffect, useContext } from 'react'
import { Marker, Popup } from 'react-map-gl'
import busStop from 'images/icon_busstop.png'
import { locationData } from 'actions/initialData/locationData'

const MarkerBusStop = ({ searchRoute }) => {
  const [markerLocation, setMarkerLocation] = useState([])

  useEffect(() => {
    const getRoutesCheckBox = searchRoute
      .filter(i => i.isChecked)
      .map(i => i.nameBusRouter)
    const markerLocation = locationData
      .filter(i => {
        return getRoutesCheckBox.indexOf(i.nameBusRouter) !== -1
      })
      .filter(i => i.directionRoute === 'turn')
      .map(i => i.route)
    setMarkerLocation(markerLocation)
    // validation route
    // console.log(markerLocation.map(i =>
    //   i.every(i =>typeof(i.name) === 'string')))
  }, [searchRoute])

  const [showPopup, setShowPopup] = useState(false)
  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
  }

  return (
    <div className="marker-bus-stop">
      {markerLocation.map(i =>
        i.map(i => (
          <Marker
            key={i.id}
            latitude={i.location.lat}
            longitude={i.location.lng}
            anchor="bottom"
          >
            <img
              style={{ height: 40, width: 30, cursor: 'pointer' }}
              src={busStop}
              alt="marker"
              onClick={handleTogglePopup}
            />
            {showPopup && (
              <Popup
                key={i.id}
                latitude={i.location.lat}
                longitude={i.location.lng}
                anchor="top-right"
                closeOnClick={false}
              >
                {i.name}
              </Popup>
            )}
          </Marker>
        ))
      )}
    </div>
  )
}

export default MarkerBusStop
