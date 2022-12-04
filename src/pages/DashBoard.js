import React from 'react'
import { Admin, Resource } from 'react-admin'
import { fetchJson as httpClient } from 'config/httpClient'
import myDataProvider from 'config/myDataProvider'
import { BusRoutes, createBusRoutes } from 'components/Admin/BusRoutes'
import BusStops from 'components/Admin/BusStops'
import InfoBusRoute from 'components/Admin/InfoBusRoute'
import RoadMap from 'components/Admin/RoadMap'
import TimeBusStart from 'components/Admin/TimeBusStart'
import Travels from 'components/Admin/Travels'

const dataProvider = myDataProvider('http://localhost:8017/v1', httpClient)

const DashBoard = () => {
  return (
    <div className="dash-board">
      <Admin basename="/dashboard" dataProvider={dataProvider}>
        <Resource name="busroutes" list={BusRoutes} create={createBusRoutes} />
        <Resource name="busstops" list={BusStops} />
        <Resource name="infobusroutes" list={InfoBusRoute} />
        <Resource name="roadroutes" list={RoadMap} />
        <Resource name="timebusstart" list={TimeBusStart} />
        <Resource name="travels" list={Travels} />
      </Admin>
    </div>
  )
}

export default DashBoard
