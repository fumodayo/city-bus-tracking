import { busStopData } from 'actions/initialData/busStopData'
import { timeBusStart } from 'actions/initialData/timeBusStart'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const BusLocation = ({ idBusStop }) => {
  const [getrealtime, setRealtime] = useState('')
  const [timeBusStop, setTimeBusStop] = useState(1000)

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
    // get codeBusRoute && directionRoute in bus stop
    const busStopFindById = busStopData.filter(
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
  }, [getrealtime, idBusStop])

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
