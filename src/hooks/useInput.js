import { API_KEY_MAPBOX } from 'config/constant'
import { useState } from 'react'

const useInput = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  const [location, setLocation] = useState([])

  const handleChange = async event => {
    setValue(event.target.value)
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/Da%20Nang%20${event.target.value}.json?access_token=${API_KEY_MAPBOX}&autocomplete=true&country=vn&limit=10`
      const response = await fetch(endpoint)
      const results = await response.json()
      setSuggestions(results?.features)
      setLocation(results?.features)
    } catch (error) {
      console.log('Error fetching data, ', error)
    }
  }

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
    location,
    setLocation
  }
}

export default useInput
