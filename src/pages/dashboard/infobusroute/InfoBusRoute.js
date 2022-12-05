import React from 'react'
import { useEffect } from 'react'

const InfoBusRoute = ({setSelectedLink, link}) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])
  
  return (
    <div>InfoBusRoute</div>
  )
}

export default InfoBusRoute