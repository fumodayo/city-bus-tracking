import { Typography } from '@mui/material'
import { useBusStop } from 'hooks/useBusStop'
import { useTimeBusStart } from 'hooks/useTimeBusStart'
import { useTravel } from 'hooks/useTravel'
import HTMLReactParser from 'html-react-parser'
import mapboxAPI from 'mapbox'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const BusLocation = ({ idBusStop }) => {
  const [getrealtime, setRealtime] = useState('')
  const [timeBusStop, setTimeBusStop] = useState(1000)
  const [travelLocation, setTravelLocation] = useState({})
  const [busStopFindById, setBusStopFindById] = useState({})
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
      setBusStopFindById(busStopFindById)
      const codeBusStop = busStopFindById.codeBusRoute
      const directionBusStop = busStopFindById.directionRoute
      const nameTravel = busStopFindById.travelNear

      const travellocation = travels.filter(i => i.title === nameTravel)
      setTravelLocation(travellocation)

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

  const [distanceNear, setDistanceNear] = useState({})

  useEffect(() => {
    const fetchDistance = async () => {
      const res = await mapboxAPI.getDirection(
        [busStopFindById.location.lng, busStopFindById.location.lat],
        [travelLocation[0].location.lng, travelLocation[0].location.lat]
      )
      const dis = {
        distance: res.routes[0].distance,
        duration: res.routes[0].duration
      }
      setDistanceNear(dis)
    }
    fetchDistance()
  }, [busStopFindById, travelLocation])

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

  const typeTravel = typeLocation => {
    let name = ''
    switch (typeLocation) {
      case 'center':
        name = 'Trung tâm vui chơi'
        break
      case 'checkin':
        name = 'Địa điểm chụp ảnh'
        break
      case 'cultural':
        name = 'Địa điểm văn hóa'
        break
      case 'discover':
        name = 'Địa điểm khám phá'
        break
      case 'night':
        name = 'Địa điểm vui chơi về đêm'
        break
      default:
        name = 'Chưa cập nhật'
    }
    return (
      <div
        style={{
          position: 'absolute',
          padding: '5px',
          bottom: '4%',
          left: '4%',
          borderRadius: '5px',
          backgroundColor: '#1b1f24'
        }}
      >
        <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
          {name}
        </span>
      </div>
    )
  }

  return (
    <div
      className="bus-location-time-countdown"
      style={{
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingTop: '5px'
      }}
    >
      <Countdown
        date={Date.now() + timeBusStop}
        renderer={renderer}
        intervalDelay={0}
        precision={3}
      />
      {travelLocation.length > 0 &&
        travelLocation?.map(travel => (
          <div
            key={travel.id}
            style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
          >
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              Những địa điểm du lịch gần trạm xe:
            </Typography>
            <div style={{ position: 'relative' }}>
              <img
                style={{
                  width: 350,
                  height: 400,
                  objectFit: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '10px'
                }}
                src={travel?.image}
                alt={travel?.imageDesc}
              />
              {typeTravel(travel.typeLocation)}
            </div>
            <Typography style={{ fontWeight: 'bold' }}>
              {travel.title}
            </Typography>
            <Typography>
              {travel?.description && HTMLReactParser(travel?.description)}
            </Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              Địa điểm cách trạm xe tầm:{' '}
              {`${Math.round(distanceNear.duration)} m`}
            </Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              Đi bộ trong: {`${Math.round(distanceNear.duration / 60)} phút`}
            </Typography>
          </div>
        ))}
    </div>
  )
}

export default BusLocation
