import React, { useState, useEffect } from 'react'
import { locationData } from 'actions/initialData/locationData'

const AllBusStop = () => {
  // Get All Bus Stop
  const [allBusStop, setAllBusStop] = useState([])
  useEffect(() => {
    const handleGetAllBusStop = () => {
      const getAllBusStopInRoutes = locationData.busRoutes.map(i => i.route)
      let allDataBusStop = []
      allDataBusStop = [...allDataBusStop, getAllBusStopInRoutes].flat(2)
      return allDataBusStop
    }
    const getData = handleGetAllBusStop()
    setAllBusStop(getData)
  }, [])

  return (
    <div className="all-bus-stop">
      {allBusStop.map((busstop, index) => (
        <div key={index} className="row align-items-center h-100">
          <div className="small-3">
            <div className="route-no text-center">
              <span>{index + 1}</span>
            </div>
          </div>

          <div className="small-7">
            <p
              style={{
                color: '#000',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {busstop.name}
            </p>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  )
}

export default AllBusStop
