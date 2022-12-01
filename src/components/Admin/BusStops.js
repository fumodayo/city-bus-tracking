import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const BusStops = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="codeBusRoute" />
        <TextField source="nameBusStop" />
        <TextField source="directionRoute" />
        <TextField source="travelTime" />
        <TextField source="location" />
      </Datagrid>
    </List>
  )
}

export default BusStops
