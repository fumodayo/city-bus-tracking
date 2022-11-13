import { useState, useEffect } from 'react'
import { timeBusStart } from 'actions/initialData/timeBusStart'

export const useTimeBusStart = () => {
  const [time, setTime] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await timeBusStart
      let bt = []
      bt = res.map(bus => ({
        id: bus.id,
        codeBusRoute: bus.codeBusRoute,
        directionRoute: bus.directionRoute,
        startingTime: bus.startingTime
      }))
      setTime(bt)
    }
    fetchBusStop()
  }, [])
  return time
}
