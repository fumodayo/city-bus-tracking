import mapboxAPI from 'mapbox'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isPointInPolygon } from 'utilities/isPointInPolygon'
import { useBusStop } from './useBusStop'

export const useLocationNear = () => {
  const busstops = useBusStop()
  const [points, setPoints] = useState([])
  const [listPointsInPolygon, setListPointsInPolygon] = useState([])
  const [IDMinPointDistance, setIDMinPointDistance] = useState({})

  const here = useSelector(state => state.routes.direction)

  const [yourLocation, setYourLocation] = useState([])
  useEffect(() => {
    let start = []
    if (here.id === 'begin') {
      start = here.location
      setYourLocation(start)
    }
  }, [here])

  useEffect(() => {
    setPoints(busstops)
  }, [busstops])

  useEffect(() => {
    const fetchPolygon = async () => {
      const res = await mapboxAPI.getIsochroneMap(
        yourLocation[0],
        yourLocation[1]
      )
      const polygon = res.features[0].geometry.coordinates[0]

      const bs = points.map(bus => ({
        id: bus.id,
        location: [Number(bus.location.lng), Number(bus.location.lat)]
      }))

      const listLocationInPolygon = bs.filter(i =>
        isPointInPolygon(i.location, polygon)
      )
      setListPointsInPolygon(listLocationInPolygon)
    }
    if (yourLocation.length !== 0) {
      fetchPolygon()
    }
  }, [points, yourLocation])

  useEffect(() => {
    const fetchDistance = async () => {
      const compareDistance = async () => {
        let total = []
        for (let i in listPointsInPolygon) {
          const res = await mapboxAPI.getDirection(
            yourLocation,
            listPointsInPolygon[i].location
          )
          total.push({
            id: listPointsInPolygon[i].id,
            distance: res.routes[0].distance
          })
        }
        const minDistance = Math.min(...total.map(({ distance }) => distance))
        const idMinDistance = total.filter(i => i.distance === minDistance)
        setIDMinPointDistance(idMinDistance[0]?.id)
      }
      compareDistance()
    }
    if (listPointsInPolygon.length > 0) {
      fetchDistance()
    }
  }, [yourLocation, listPointsInPolygon])

  return IDMinPointDistance
}
