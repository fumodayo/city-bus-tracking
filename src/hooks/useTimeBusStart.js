import { useState, useEffect } from 'react'
import danabus from 'danabus'

export const useTimeBusStart = () => {
  const [time, setTime] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await danabus.getTimeBusStart()
      let bt = []
      bt = res.map(bus => ({
        id: bus._id,
        codeBusRoute: bus.codeBusRoute,
        directionRoute: bus.directionRoute,
        startingTime: bus.startingTime,
        createdAt: bus.createdAt
      }))
      setTime(bt)
    }
    fetchBusStop()
  }, [])
  return time
}
