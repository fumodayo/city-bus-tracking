import React from 'react'
import { useParams } from 'react-router-dom'

const EditBusRoutes = () => {
  let { busrouteId } = useParams()
  return (
    <div>{busrouteId}</div>
  )
}

export default EditBusRoutes