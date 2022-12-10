import { Typography } from '@mui/material'
import { useBusStop } from 'hooks/useBusStop'
import { useTimeBusStart } from 'hooks/useTimeBusStart'
import { useTravel } from 'hooks/useTravel'
import HTMLReactParser from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const BusLocation = ({ idBusStop }) => {
  const [getrealtime, setRealtime] = useState('')
  const [timeBusStop, setTimeBusStop] = useState(1000)
  const [travelLocation, setTravelLocation] = useState({})
  const allBusStop = useBusStop()
  const timeBusStart = useTimeBusStart()
  const travels = useTravel()

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
      const nameTravel = busStopFindById.travelNear

      const travelLocation = travels.filter(i => i.title === nameTravel)
      setTravelLocation(travelLocation)

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
  }, [getrealtime, idBusStop, allBusStop, timeBusStart, travels])

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
      {travelLocation.length > 0 &&
        travelLocation?.map(travel => (
          <div key={travel.id}>
            <Typography>Những địa điểm du lịch gần trạm xe: </Typography>
            <Typography>{travel.title}</Typography>
            <img
              style={{
                width: 350,
                height: 300,
                objectFit: 'cover',
                backgroundPosition: 'center'
              }}
              src={travel?.image}
              alt={travel?.imageDesc}
            />
            <Typography>Địa điểm cách trạm xe tầm: </Typography>
            <Typography>Giới thiệu</Typography>
            <Typography>
              {travel?.description && HTMLReactParser(travel?.description)}
            </Typography>
          </div>
        ))}
    </div>
  )
}

export default BusLocation
