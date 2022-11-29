import { useState, useEffect } from 'react'
import { busStopData } from 'actions/initialData/busStopData'
import danabus from 'danabus'

export const useBusStop = () => {
  const [busStop, setBusStop] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await danabus.getFullBusStop()
      let bs = []
      bs = res.map(bus => ({
        id: bus._id,
        nameBusStop: bus.nameBusStop,
        codeBusRoute: bus.codeBusRoute,
        directionRoute: bus.directionRoute,
        travelTime: bus.travelTime,
        location: {
          lng: bus.location.lng,
          lat: bus.location.lat
        }
      }))
      setBusStop(bs)
    }
    fetchBusStop()
  }, [])
  return busStop
}
