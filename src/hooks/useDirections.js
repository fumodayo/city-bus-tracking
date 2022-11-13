import mapbox from 'mapbox'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useDirections = () => {
  const points = useSelector(state => state.routes.direction)
  const [beginPoint, setBeginPoint] = useState([])
  const [endPoint, setEndPoint] = useState([])
  useEffect(() => {
    let start,
      end = []
    if (points.id === 'begin') {
      start = points.location
      setBeginPoint(start)
    }
    if (points.id === 'end') {
      end = points.location
      setEndPoint(end)
    }
  }, [points])

  const [direction, setDirection] = useState({})
  useEffect(() => {
    const fecthDirections = async () => {
      const res = await mapbox.getDirection(beginPoint, endPoint)
      const dict = {}
      dict.beginCords = beginPoint
      dict.endCords = endPoint
      dict.distance = res.routes[0].distance
      dict.duration = res.routes[0].duration
      dict.map = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: res.routes[0].geometry.coordinates
        }
      }
      dict.steps = res.routes[0].legs[0].steps.map(step => ({
        name: step.maneuver.instruction,
        guide: step.maneuver.modifier || 'here',
        distance: step.distance,
        duration: step.duration
      }))
      setDirection(dict)
    }
    if (beginPoint.length !== 0 && endPoint.length !== 0) {
      fecthDirections()
    }
  }, [beginPoint, endPoint])
  return direction
}
