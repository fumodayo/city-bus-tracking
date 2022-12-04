import React from 'react'
import { List, Datagrid, TextField, SimpleForm, TextInput, Create } from 'react-admin'

export const BusRoutes = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="codeBusRoute" />
      <TextField source="nameRoute" />
      <TextField source="directionRoute" />
      <TextField source="drivingJourney" />
      <TextField source="lineDistance" />
      <TextField source="operatingTime" />
      <TextField source="colorRoute" />
    </Datagrid>
  </List>
)

export const createBusRoutes = () => (
  <Create>
    <SimpleForm>
      <TextInput source="codeBusRoute" />
      <TextInput source="nameRoute" />
      <TextInput source="directionRoute" />
      <TextInput source="drivingJourney" />
      <TextInput source="lineDistance" />
      <TextInput source="operatingTime" />
      <TextInput source="colorRoute" />
    </SimpleForm>
  </Create>
)
