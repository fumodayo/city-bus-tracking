import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

const BusRoutes = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  return (
    <div>
      BusRoutes
      <Button component={Link} to="/busroutes/createBusRoutes">
        Create BusRoutes
      </Button>
    </div>
  )
}

export default BusRoutes
