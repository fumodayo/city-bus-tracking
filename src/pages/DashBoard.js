import React from 'react'
import { Admin, Resource } from 'react-admin'
import { fetchJson as httpClient } from './httpClient'
import myDataProvider from './myDataProvider'
import BusRoutes from 'components/Admin/BusRoutes'
import BusStops from 'components/Admin/BusStops'

const dataProvider = myDataProvider('http://localhost:8017/v1', httpClient)

const DashBoard = () => {
  return (
    <div className="dash-board">
      <Admin basename="/dashboard" dataProvider={dataProvider}>
        <Resource name="busroutes" list={BusRoutes} />
        <Resource name="busstops" list={BusStops} />
      </Admin>
    </div>
  )
}

export default DashBoard
