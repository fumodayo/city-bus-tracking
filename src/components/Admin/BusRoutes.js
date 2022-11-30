import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const BusRoutes = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="codeBusRoute" />
        <TextField source="nameRoute" />
        <TextField source="directionRoute" />
        <TextField source="lineDistance" />
        <TextField source="operatingTime" />
        <TextField source="colorRoute" />
      </Datagrid>
    </List>
  )
}

export default BusRoutes
