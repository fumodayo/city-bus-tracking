import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const InfoBusRoute = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="ticketPrice" />
        <TextField source="linkMonthlyTicket" />
        <TextField source="linkOnline" />
        <TextField source="busName" />
        <TextField source="busCapacity" />
        <TextField source="busOperation" />
      </Datagrid>
    </List>
  )
}

export default InfoBusRoute
