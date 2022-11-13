import { useBusStop } from 'hooks/useBusStop'
import { useTimeBusStart } from 'hooks/useTimeBusStart'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const BusLocation = ({ idBusStop }) => {
  const [getrealtime, setRealtime] = useState('')
  const [timeBusStop, setTimeBusStop] = useState(1000)
  const allBusStop = useBusStop()
  const timeBusStart = useTimeBusStart()

  const addZeroBeforeTime = time => {
    return time < 10 ? '0' + time : time
  }
  // Get current real time
  useEffect(() => {
    const timer = setInterval(() => {
      const today = new Date()

      const currentTime =
        addZeroBeforeTime(today.getHours()) +
        ':' +
        addZeroBeforeTime(today.getMinutes())
      setRealtime(currentTime)
    }, 1000)

    return () => setInterval(timer)
  }, [])

  useEffect(() => {
    if (allBusStop.length !== 0 && timeBusStart.length !== 0) {
      // get codeBusRoute && directionRoute in bus stop
      const busStopFindById = allBusStop.filter(
        busstop => busstop.id === idBusStop
      )[0]
      const codeBusStop = busStopFindById.codeBusRoute
      const directionBusStop = busStopFindById.directionRoute

      // get array time bus starts
      const allTimeBusStarts = timeBusStart.filter(
        route =>
          route.codeBusRoute === codeBusStop &&
          route.directionRoute === directionBusStop
      )[0].startingTime

      // Get travel time in bus stop
      const busStopTravelTime = busStopFindById.travelTime * 60 * 1000

      setTimeBusStop(busStopTravelTime)

      if (getrealtime >= '06:00' || getrealtime <= '21:00') {
        if (allTimeBusStarts.indexOf(getrealtime) !== -1) {
          setTimeBusStop(busStopTravelTime)
        }
      } else {
        setTimeBusStop(0)
      }
    }
  }, [getrealtime, idBusStop, allBusStop, timeBusStart])

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span style={{ fontSize: '20px', color: '#000' }}>Xe đã đến bến</span>
      )
    }

    const showTime = `${addZeroBeforeTime(hours)}:${addZeroBeforeTime(
      minutes
    )}:${addZeroBeforeTime(seconds)}`

    return (
      <span style={{ fontSize: '20px', color: '#000' }}>
        {showTime === '00:00:00'
          ? 'Xe chưa xuất bến'
          : `Xe còn ${showTime} sẽ tới bến`}
      </span>
    )
  }

  return (
    <div className="bus-location-time-countdown">
      <Countdown
        date={Date.now() + timeBusStop}
        renderer={renderer}
        intervalDelay={0}
        precision={3}
      />
    </div>
  )
}

export default BusLocation
