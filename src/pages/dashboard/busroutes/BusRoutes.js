import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BusRoutes = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

  return (
    <div>
      BusRoutes
      <Button onClick={() => navigate('/dashboard/createBusRoutes')}>
        Create BusRoutes
      </Button>
    </div>
  )
}

export default BusRoutes
