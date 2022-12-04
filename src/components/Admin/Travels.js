import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const Travels = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="typeLocation" />
        <TextField source="image" />
        <TextField source="imageDesc" />
        <TextField source="description" />
        <TextField source="locationLink" />
        <TextField source="locationName" />
        <TextField source="location" />
      </Datagrid>
    </List>
  )
}

export default Travels
