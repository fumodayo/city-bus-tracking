import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown'

const TimerTest = [
  {
    id: 1,
    name: 'A',
    timer: 50000
  },
  {
    id: 2,
    name: 'B',
    timer: 60000
  },
  {
    id: 3,
    name: 'C',
    timer: 70000
  }
]

const CountdownBusStop = () => {
  const [realtime, setRealtime] = useState('')
  const [timeData, setTimeData] = useState([])

  const addZero = time => {
    if (time < 10) {
      time = '0' + time
    }
    return time
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Done!</span>
    } else {
      return (
        <span>
          {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
        </span>
      )
    }
  }

  // Get current time
  useEffect(() => {
    const timer = setInterval(() => {
      const today = new Date()
      const currentTime =
        addZero(today.getHours()) + ':' + addZero(today.getMinutes())
      setRealtime(currentTime)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Input data time in all location
  useEffect(() => {
    const getAllTime = TimerTest.map(i => i.timer)
    if (realtime !== []) {
      if (realtime === '06:00') {
        setTimeData([])
        setTimeData(getAllTime)
      } else {
        setTimeData(getAllTime)
      }
    }
  }, [realtime])

  return (
    <div className="countdown-busstop">
      {timeData.map((item, idx) => (
        <Countdown
          key={idx}
          date={Date.now() + item}
          renderer={renderer}
          intervalDelay={0}
          precision={3}
        />
      ))}
    </div>
  )
}

export default CountdownBusStop
