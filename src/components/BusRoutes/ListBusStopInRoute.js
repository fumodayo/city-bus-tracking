import { busStopData } from 'actions/initialData/busStopData'
import React, { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import InfoBusRoute from 'components/BusRoutes/InfoBusRoute'
import { useDispatch } from 'react-redux'
import MarkerBusStop from 'components/Common/MarkerBusStop/MarkerBusStop'
import PolylineListBusStop from 'components/BusRoutes/PolylineListBusStop'
import { setIDBusStop } from 'redux/slices/routes'
import './listbusstop.scss'

const ListBusStopInRoute = ({ nameCodeRoute, turnRoute }) => {
  const [listDataBusStop, setListDataBusStop] = useState([])
  useEffect(() => {
    const listData = busStopData.filter(
      busstop =>
        busstop.codeBusRoute === nameCodeRoute &&
        busstop.directionRoute === turnRoute
    )
    setListDataBusStop(listData)
  }, [nameCodeRoute, turnRoute])

  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [idBusStop, setIdBusStop] = useState('')
  const handleStepIndexChange = (e, key) => {
    const idbusstop = e.currentTarget.id
    setIdBusStop(idbusstop)
    dispatch(setIDBusStop(idBusStop))
    setCurrentIndex(key)
  }
  const _handleSliderIndex = key => {
    setCurrentIndex(key)
  }

  const [tabValue, setTabValue] = useState('1')
  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  // get nameBusStop & locationBusStop by Id
  const [nameBusStop, setNameBusStop] = useState('')
  const [locationBusStop, setLocationBusStop] = useState({})
  useEffect(() => {
    const nameBusStopInList = busStopData.filter(i => i.id === idBusStop)[0]
      ?.nameBusStop
    setNameBusStop(nameBusStopInList)

    const locationBusStopInList = busStopData.filter(i => i.id === idBusStop)[0]
      ?.location
    setLocationBusStop(locationBusStopInList)
  }, [idBusStop])

  return (
    <div className="list-bus-station">
      <TabContext value={tabValue}>
        <TabList onChange={handleChangeTab} aria-label="lab">
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
                max={listDataBusStop?.length - 1}
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
                {listDataBusStop?.map((busstop, index) => {
                  let color = currentIndex === index ? '#8fbc8f' : '#000'
                  return (
                    <div
                      className="steps-item"
                      onClick={e => handleStepIndexChange(e, index)}
                      id={busstop.id}
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
                        {busstop.nameBusStop}
                      </h3>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabPanel>
        </div>
        <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="2">
          <InfoBusRoute nameCodeRoute={nameCodeRoute} turnRoute={turnRoute} />
        </TabPanel>
      </TabContext>
      {nameBusStop && locationBusStop && (
        <MarkerBusStop
          nameBusStop={nameBusStop}
          locationBusStop={locationBusStop}
        />
      )}
      <PolylineListBusStop
        nameCodeRoute={nameCodeRoute}
        turnRoute={turnRoute}
      />
    </div>
  )
}

export default ListBusStopInRoute
