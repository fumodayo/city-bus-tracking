import { useState, useEffect } from 'react'
import { informationBusRouteData } from 'actions/initialData/informationBusRouteData'
import danabus from 'danabus'

export const useFormatInfo = () => {
  const [info, setInfo] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await informationBusRouteData
      let inf = {}
      inf.id = res[0].id
      inf.busTicketOneWay = res[0].busTicketOneWay
      inf.busTicketPrioritized = res[0].busTicketPrioritized
      inf.busTicketOrdinary = res[0].busTicketOrdinary
      inf.busName = res[0].busName
      inf.busCapacity = res[0].busCapacity
      inf.busOperation = res[0].busOperation
      inf.createAt = res[0].createAt
      setInfo(inf)
    }
    fetchBusStop()
  }, [])
  return info
}
