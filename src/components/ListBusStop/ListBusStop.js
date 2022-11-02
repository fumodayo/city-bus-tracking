import { locationData } from 'actions/initialData/locationData'
import React, { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab'
import { Tab } from '@mui/material'
import './listbusstop.scss'
import InfoBusRoute from 'components/InfoBusRoute/InfoBusRoute'

const ListBusStop = ({
  nameRouteGetList,
  turnRoute
}) => {
  const [listDataBusStop, setListDataBusStop] =
    useState([])

  useEffect(() => {
    const listData = locationData
      .filter(
        i =>
          i.nameBusRouter === nameRouteGetList &&
          i.directionRoute === turnRoute
      )
      .map(i => i.route.map(i => i.name))
      .flat(1)
    setListDataBusStop(listData)

  }, [nameRouteGetList, turnRoute])

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const handleStepIndexChange = (e, key) => {
    setCurrentIndex(key)
  }

  const _handleSliderIndex = key => {
    setCurrentIndex(key)
  }

  const [tabValue, setTabValue] = useState('1')
  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <div className="list-bus-station">
      <TabContext value={tabValue}>
        <TabList
          onChange={handleChangeTab}
          aria-label="lab"
        >
          <Tab
            style={{
              width: '50%',
              textTransform: 'none'
            }}
            label="Trạm dừng"
            value="1"
          />
          <Tab
            style={{
              width: '50%',
              textTransform: 'none'
            }}
            label="Thông tin"
            value="2"
          />
        </TabList>
        <div className="scroll-list-bus-stop-content">
          <TabPanel
            style={{
              padding: '12px 0px 10px 0px'
            }}
            value="1"
          >
            <div className="list-bus-stop">
              <ReactSlider
                className="vertical-slider"
                markClassName="example-mark"
                onChange={_handleSliderIndex}
                trackClassName="example-track"
                defaultValue={0}
                value={currentIndex}
                min={0}
                max={listDataBusStop.length - 1}
                marks
                renderMark={props => {
                  if (props.key < currentIndex) {
                    props.className =
                      'example-mark example-mark-completed'
                  } else if (
                    props.key === currentIndex
                  ) {
                    props.className =
                      'example-mark example-mark-active'
                  }
                  return <span {...props} />
                }}
                orientation="vertical"
              />

              <div className="steps-container">
                {listDataBusStop.map(
                  (step, index) => {
                    let color =
                      currentIndex === index
                        ? '#8fbc8f'
                        : '#000'
                    return (
                      <div
                        className="steps-item"
                        onClick={e =>
                          handleStepIndexChange(
                            e,
                            index
                          )
                        }
                        key={index}
                      >
                        <h3
                          style={{
                            margin: 0,
                            color: color,
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {step}
                        </h3>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </TabPanel>
        </div>
        <TabPanel
          style={{ padding: '12px 0px 10px 0px' }}
          value="2"
        >
          <InfoBusRoute
            nameRouteGetList={nameRouteGetList}
            turnRoute={turnRoute}
          />
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default ListBusStop
