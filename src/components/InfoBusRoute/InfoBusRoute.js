import React, { useEffect, useState } from 'react'
import { informationBusRouteData } from 'actions/initialData/informationBusRouteData'
import { locationData } from 'actions/initialData/locationData'
import HTMLReactParser from 'html-react-parser'
import './InfoBusRoute.scss'

const InfoBusRoute = ({ nameBusRoute, turnRoute }) => {
  const [busRouteData, setBusRouteData] = useState([])
  const [ticketBusData, setTicketBusData] = useState({})

  useEffect(() => {
    const listData = locationData
      .filter(i => i.nameBusRouter === nameBusRoute && i.directionRoute === turnRoute)
      .map(i => i)
    setBusRouteData(listData)

    const ticketData = informationBusRouteData
    setTicketBusData(ticketData)
  }, [nameBusRoute, turnRoute])

  console.log(ticketBusData)
  return (
    <div className="info-bus-route">
      {busRouteData.map((bus, id) => (
        <div key={id}>
          <h1 className="header-info">Thông tin tuyến:</h1>
          <div className="info">
            <label>Mã số tuyến:</label>
            <span>{bus.nameBusRouter}</span>
          </div>
          <div className="info">
            <label>Tên tuyến: </label>
            <span>{bus.name}</span>
          </div>
          <div className="info">
            <label>Tuyến: </label>
            <span>{HTMLReactParser(bus.drivingJourney)}</span>
          </div>
          <div className="info">
            <label>Thời gian hoạt động: </label>
            <span>{bus.operatingTime}</span>
          </div>
          <hr />
        </div>
      ))}

      <h1 className="header-info">Thông tin xe:</h1>
      <div className="info">
        <label>Nhãn hiệu: </label>
        <span>{ticketBusData.busName}</span>
      </div>
      <div className="info">
        <label>Sức chứa: </label>
        <span>{ticketBusData.busCapacity}</span>
      </div>
      <div className="info">
        <label>Đơn vị vận hành: </label>
        <span>{ticketBusData.busOperation}</span>
      </div>

      <hr />
      <h1 className="header-info">Thông tin vé:</h1>
      {ticketBusData.ticketPrice && (
        <div>
          <div className="info">
            <label>Vé lượt: </label>
            <span>{ticketBusData.ticketPrice[0]}</span>
          </div>

          <div className="info">
            <label>Vé tháng ưu tiên: </label>
            <span>{ticketBusData.ticketPrice[1]}</span>
          </div>
          <div className="info">
            <label>Vé tháng không ưu tiên: </label>
            <span>{ticketBusData.ticketPrice[2]}</span>
          </div>
        </div>
      )}
      <div className="info">
        <label>Đăng kí vé tháng tại: </label>
        <a href={ticketBusData.linkOnline}>Đây.</a>
      </div>
    </div>
  )
}

export default InfoBusRoute
