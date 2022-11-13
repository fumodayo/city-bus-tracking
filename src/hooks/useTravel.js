import { useState, useEffect } from 'react'
import { locationTravelData } from 'actions/initialData/locationTravelData'

export const useTravel = () => {
  const [travels, setTravels] = useState([])
  useEffect(() => {
    const fetchBusStop = async () => {
      const res = await locationTravelData
      let tvs = []
      tvs = res.map(travel => ({
        id: travel.id,
        title: travel.title,
        typeLocation: travel.typeLocation,
        image: travel.image,
        imageDesc: travel.imageDesc,
        description: travel.description,
        locationLink: travel.locationLink,
        locationName: travel.locationName,
        location: {
          lng: travel.location.lng,
          lat: travel.location.lat
        }
      }))
      setTravels(tvs)
    }
    fetchBusStop()
  }, [])
  return travels
}
