import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import PaidIcon from '@mui/icons-material/Paid'
import { useBusRoutes } from 'hooks/useBusRoutes'
import { useFormatInfo } from 'hooks/useFormatInfo'
import './InfoBusRoute.scss'

const InfoBusRoute = ({ nameCodeRoute, turnRoute }) => {
  const routes = useBusRoutes()
  const info = useFormatInfo()
  const [busRouteData, setBusRouteData] = useState([])
  const [ticketBusData, setTicketBusData] = useState({})

  useEffect(() => {
    const listData = routes.filter(
      route =>
        route.codeBusRoute === nameCodeRoute &&
        route.directionRoute === turnRoute
    )[0]
    setBusRouteData(listData)

    setTicketBusData(info)
  }, [nameCodeRoute, turnRoute, routes, info])

  return (
    <div className="info-bus-route">
      <div>
        <h1 className="header-info">
          <DirectionsBusIcon />
          Thông tin tuyến:
        </h1>
        <div className="info">
          <label>Mã số tuyến:</label>
          <span>{busRouteData?.nameBusRouter}</span>
        </div>
        <div className="info">
          <label>Tên tuyến: </label>
          <span>{busRouteData?.name}</span>
        </div>
        <div className="info">
          <label>Tuyến: </label>
          <span>
            {busRouteData?.drivingJourney &&
              HTMLReactParser(busRouteData?.drivingJourney)}
          </span>
        </div>
        <div className="info">
          <label>Thời gian hoạt động: </label>
          <span>{busRouteData?.operatingTime}</span>
        </div>
        <hr />
      </div>

      <h1 className="header-info">
        <AirportShuttleIcon />
        Thông tin xe:
      </h1>
      <div className="info">
        <label>Nhãn hiệu: </label>
        <span>{ticketBusData?.busName}</span>
      </div>
      <div className="info">
        <label>Sức chứa: </label>
        <span>{ticketBusData?.busCapacity}</span>
      </div>
      <div className="info">
        <label>Đơn vị vận hành: </label>
        <span>{ticketBusData?.busOperation}</span>
      </div>
      <hr />
      <h1 className="header-info">
        <PaidIcon />
        Thông tin vé:
      </h1>
      {ticketBusData?.ticketPrice && (
        <div>
          <div className="info">
            <label>Vé lượt: </label>
            <span>{ticketBusData?.ticketPrice[0]}</span>
          </div>

          <div className="info">
            <label>Vé tháng ưu tiên: </label>
            <span>{ticketBusData?.ticketPrice[1]}</span>
          </div>
          <div className="info">
            <label>Vé tháng không ưu tiên:</label>
            <span>{ticketBusData?.ticketPrice[2]}</span>
          </div>
        </div>
      )}
      <div className="info">
        <label>Đăng kí vé tháng tại: </label>
        <a href={ticketBusData?.linkOnline}>Đây.</a>
      </div>
    </div>
  )
}

export default InfoBusRoute
