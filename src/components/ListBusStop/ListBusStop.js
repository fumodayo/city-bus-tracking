import { locationData } from 'actions/initialData/locationData'
import React, { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import './listbusstop.scss'

const ListBusStop = ({ nameBusRoute }) => {
  const [listDataBusStop, setListDataBusStop] = useState([])

  console.log(listDataBusStop)
  useEffect(() => {
    const listData = locationData
      .filter(i => i.nameBusRouter === nameBusRoute && i.directionRoute === 'turn')
      .map(i => i.route.map(i => i.name)).flat(1)
    setListDataBusStop(listData)
  }, [nameBusRoute])

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleStepIndexChange = (e, key) => {
    setCurrentIndex(key)
  }

  const _handleSliderIndex = key => {
    setCurrentIndex(key)
  }

  return (
    <div className="list-bus-stop">
      <ReactSlider
        className="vertical-slider"
        markClassName="example-mark"
        onChange={_handleSliderIndex}
        trackClassName="example-track"
        defaultValue={0}
        value={currentIndex}
        min={0}
        max={55}
        marks
        renderMark={props => {
          if (props.key < currentIndex) {
            props.className = 'example-mark example-mark-completed'
          } else if (props.key === currentIndex) {
            props.className = 'example-mark example-mark-active'
          }
          return <span {...props} />
        }}
        orientation="vertical"
      />

      <div className="steps-container">
        {listDataBusStop.map((step, index) => {
          let color = currentIndex === index ? '#8fbc8f' : '#000'
          return (
            <div
              className="steps-item"
              onClick={e => handleStepIndexChange(e, index)}
              key={index}
            >
              <h3
                style={{
                  margin: 0,
                  color: color,
                  fontSize: '18px',
                  fontWeight: 600
                }}
              >
                {step}
              </h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListBusStop
