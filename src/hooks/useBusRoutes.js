import { useState, useEffect } from 'react'
import { routesData } from 'actions/initialData/routesData'
import danabus from 'danabus'

export const useBusRoutes = () => {
  const [routes, setRoutes] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await danabus.getFullBusRoutes()
      let rts = []
      rts = res.map(route => ({
        id: route._id,
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
