import { useState } from 'react'
import mapboxAPI from 'mapbox'

export const useAutoSuggestions = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleChange = async event => {
    setValue(event.target.value)
    const res = await mapboxAPI.searchLocation(event.target.value)
    let plc = res.features.map(pl => {
      return {
        name: pl.place_name,
        coordinates: pl.center
      }
    })
    setSuggestions(plc)
  }

  return {
    value,
    setValue,
    onChange: handleChange,
    suggestions,
    setSuggestions
  }
}
