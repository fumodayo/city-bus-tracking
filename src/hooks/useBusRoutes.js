import { useState, useEffect } from 'react'
import { routesData } from 'actions/initialData/routesData'

export const useBusRoutes = () => {
  const [routes, setRoutes] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await routesData
      let rts = []
      rts = res.map(route => ({
        id: route.id,
        codeBusRoute: route.codeBusRoute,
        nameRoute: route.nameRoute,
        directionRoute: route.directionRoute,
        drivingJourney: route.drivingJourney,
        lineDistance: route.lineDistance,
        operatingTime: route.operatingTime,
        colorRoute: route.colorRoute
      }))
      setRoutes(rts)
    }
    fetchBusStop()
  }, [])
  return routes
}
