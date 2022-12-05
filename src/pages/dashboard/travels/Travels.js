import React from 'react'
import { useEffect } from 'react'

const Travels = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  return <div>Travels</div>
}

export default Travels
