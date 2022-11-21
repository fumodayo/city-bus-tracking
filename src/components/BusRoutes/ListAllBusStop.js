import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import FormInput from 'components/Common/FormInput'
import CustomSidebar from 'components/Common/CustomSidebar'
import RouteThrough from 'components/BusRoutes/RouteThrough'
import BusLocation from 'components/BusRoutes/BusLocation'
import { useDispatch } from 'react-redux'
import MarkerBusStop from 'components/Common/MarkerBusStop/MarkerBusStop'
import { setIDBusStop } from 'redux/slices/routes'
import { useBusStop } from 'hooks/useBusStop'
import { setShowSidebarBusStopInLine } from 'redux/slices/form'

const ListAllBusStop = () => {
  const busStop = useBusStop()

  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  const [allBusStop, setAllBusStop] = useState([])

  useEffect(() => {
    // filter bus stop
    if (search !== '') {
      const newSearchList = busStop.filter(busstop => {
        return Object.values(busstop.nameBusStop)
          .join('')
          .toLowerCase('')
          .includes(search.toLowerCase())
      })
      setAllBusStop(newSearchList)
    } else {
      setAllBusStop(busStop)
    }
  }, [search, busStop])

  const [showSidebar, setShowSidebar] = useState(false)
  const [idBusStop, setIdBusStop] = useState('')
  const handleTarget = e => {
    setIdBusStop(e.currentTarget.id)
    setShowSidebar(!showSidebar)
  }

  // store id bus stop
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIDBusStop(idBusStop))
  }, [idBusStop])
  dispatch(setShowSidebarBusStopInLine({ isShowSidebar: true }))

  // get nameBusStop & locationBusStop by Id
  const [nameBusStop, setNameBusStop] = useState('')
  const [locationBusStop, setLocationBusStop] = useState({})
  useEffect(() => {
    const nameBusStopInList = allBusStop.filter(i => i.id === idBusStop)[0]
      ?.nameBusStop
    setNameBusStop(nameBusStopInList)

    const locationBusStopInList = allBusStop.filter(i => i.id === idBusStop)[0]
      ?.location
    setLocationBusStop(locationBusStopInList)
  }, [allBusStop, idBusStop])

  return (
    <div className="all-bus-stop">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 320,
          border: 'none',
          borderRadius: '15px',
          boxShadow: '0px 0px 7px 2px rgb(0 0 0 / 15%)',
          backgroundColor: '#ffffff',
          height: '3em',
          fontSize: '1rem'
        }}
      >
        <FormInput
          onChange={handleChangeWordSearch}
          placeholder={'Nhập tên trạm dừng...'}
        />
      </Paper>
      <div className="scroll-content">
        {allBusStop.map((busstop, index) => (
          <div
            key={busstop.id}
            className="row align-items-center h-100"
            style={{ cursor: 'pointer' }}
            onClick={handleTarget}
            id={busstop.id}
          >
            <div className="small-3 mt-10">
              <div className="route-no text-center">
                <span style={{ fontWeight: 600 }}>{index + 1}</span>
              </div>
            </div>

            <div className="small-7">
              <p
                style={{
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 600,
                  margin: '5px'
                }}
              >
                {busstop.nameBusStop}
              </p>
            </div>
            <hr></hr>
          </div>
        ))}
        {showSidebar && (
          <>
            <CustomSidebar
              show={showSidebar}
              name={nameBusStop}
              tabLeft={'Xe sắp tới trạm'}
              tabRight={'Tuyến đi qua'}
              compLeft={<BusLocation idBusStop={idBusStop} />}
              compRight={<RouteThrough idBusStop={idBusStop} />}
            />
            {locationBusStop && (
              <MarkerBusStop
                nameBusStop={nameBusStop}
                locationBusStop={locationBusStop}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ListAllBusStop
