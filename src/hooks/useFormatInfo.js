import { useState, useEffect } from 'react'
import { informationBusRouteData } from 'actions/initialData/informationBusRouteData'
import danabus from 'danabus'

export const useFormatInfo = () => {
  const [info, setInfo] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await danabus.getInformationBusRoute()
      let inf = {}
      inf.ticketPrice = res[0].ticketPrice
      inf.linkMonthlyTicket = res[0].linkMonthlyTicket
      inf.linkOnline = res[0].linkOnline
      inf.busName = res[0].busName
      inf.busCapacity = res[0].busCapacity
      inf.busOperation = res[0].busOperation
      setInfo(inf)
    }
    fetchBusStop()
  }, [])
  return info
}