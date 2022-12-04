import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const TimeBusStart = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="codeBusRoute" />
        <TextField source="directionRoute" />
        <TextField source="startingTime" />
      </Datagrid>
    </List>
  )
}

export default TimeBusStart
