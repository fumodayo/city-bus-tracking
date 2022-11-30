import React from 'react'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import BusRoutes from 'components/Admin/BusRoutes'

const DashBoard = () => {
  return (
    <div className="dash-board">
      <Admin dataProvider={simpleRestProvider('http://localhost:8017/v1')}>
        <Resource name="busroutes" list={BusRoutes} />
      </Admin>
    </div>
  )
}

export default DashBoard
