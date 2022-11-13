import { useState, useEffect } from 'react'
import { informationBusRouteData } from 'actions/initialData/informationBusRouteData'

export const useFormatInfo = () => {
  const [info, setInfo] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await informationBusRouteData
      let inf = {}
      inf.ticketPrice = res.ticketPrice
      inf.linkMonthlyTicket = res.linkMonthlyTicket
      inf.linkOnline = res.linkOnline
      inf.busName = res.busName
      inf.busCapacity = res.busCapacity
      inf.busOperation = res.busOperation
      setInfo(inf)
    }
    fetchBusStop()
  }, [])
  return info
}
