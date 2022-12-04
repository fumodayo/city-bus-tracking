import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const RoadMap = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="codeBusRoute" />
        <TextField source="directionRoute" />
        <TextField source="colorRoute" />
        <TextField source="lineRoute" />
      </Datagrid>
    </List>
  )
}

export default RoadMap
