import { locationData } from 'actions/initialData/locationData'
import { timeBusStart } from 'actions/initialData/timeBusStart'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const BusLocation = ({ nameBusStop }) => {
  const [realtime, setRealtime] = useState('')
  const [timeData, setTimeData] = useState(1000)

  // Get current real time
  useEffect(() => {
    const timer = setInterval(() => {
      const today = new Date()

      const currentTime =
        addZeroBeforeTime(today.getHours()) + ':' + addZeroBeforeTime(today.getMinutes())
      setRealtime(currentTime)
    }, 1000)

    return () => setInterval(timer)
  }, [])

  useEffect(() => {
    const objAfterFilter = locationData
      .map(i => i.route.filter(i => i.name === nameBusStop)[0])
      .filter(n => n)

    const timestart = timeBusStart.filter(
      route =>
        route.name === objAfterFilter[0].nameLocationBusRoute &&
        route.directionBusRoute === objAfterFilter[0].directionLocationBusRoute
    )[0].timestarts

    const travelTime = objAfterFilter[0].travelTime * 60 * 1000

    setTimeData(travelTime)
    if (realtime >= '6:00' && realtime <= '21:00') {
      if (timestart.indexOf(realtime) !== -1) {
        setTimeData(travelTime)
      }
    } else {
      setTimeData(0)
    }
  }, [realtime, nameBusStop])

  const addZeroBeforeTime = time => {
    return time < 10 ? '0' + time : time
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span style={{ fontSize: '20px', color: '#000' }}>Xe đã đến bến</span>
    }

    const showTime = `${addZeroBeforeTime(hours)}:${addZeroBeforeTime(
      minutes
    )}:${addZeroBeforeTime(seconds)}`

    return (
      <span style={{ fontSize: '20px', color: '#000' }}>
        {showTime === '00:00:00' ? 'Xe chưa xuất bến' : `Xe còn ${showTime} sẽ tới bến`}
      </span>
    )
  }

  return (
    <div className="bus-location-time-countdown">
      <Countdown
        date={Date.now() + timeData}
        renderer={renderer}
        intervalDelay={0}
        precision={3}
      />
    </div>
  )
}

export default BusLocation
