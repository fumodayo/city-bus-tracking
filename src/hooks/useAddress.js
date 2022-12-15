import mapboxAPI from 'mapbox'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const useAddress = () => {
  const [address, setAddress] = useState()
  const points = useSelector(state => state.routes.direction)

  useEffect(() => {
    const fetchAddressBegin = async () => {
      let adr = {}
      if (points.id === 'begin') {
        const res = await mapboxAPI.getAddress(
          points.location[0],
          points.location[1]
        )
        adr.id = 'begin'
        adr.name = res.features[0].place_name_vi || res.features[0].place_name
      }
      if (points.id === 'end') {
        const res = await mapboxAPI.getAddress(
          points.location[0],
          points.location[1]
        )
        adr.id = 'end'
        adr.name = res.features[0].place_name_vi || res.features[0].place_name
      }
      setAddress(adr)
    }

    if (points.id.length > 0 && points.location.length > 0) {
      fetchAddressBegin()
    }
  }, [points])
  return address
}
