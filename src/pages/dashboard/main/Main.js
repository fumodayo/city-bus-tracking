import React from 'react'
import { useEffect } from 'react'

const Main = ({setSelectedLink, link}) => {
  useEffect(() => {
    setSelectedLink(link)
  },[])
  
  return (
    <div>Main</div>
  )
}

export default Main