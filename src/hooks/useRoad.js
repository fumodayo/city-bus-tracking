import { useState, useEffect } from 'react'
import { roadMapData } from 'actions/initialData/roadMapData'

export const useRoad = () => {
  const [road, setRoad] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await roadMapData
      let rds = []
      rds = res.map(rd => ({
        id: rd.id,
        codeBusRoute: rd.codeBusRoute,
        directionRoute: rd.directionRoute,
        colorRoute: rd.colorRoute,
        lineRoute: rd.lineRoute
      }))
      setRoad(rds)
    }
    fetchBusStop()
  }, [])
  return road
}
