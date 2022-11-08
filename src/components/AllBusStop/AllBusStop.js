import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import FormInput from 'components/Common/FormInput'
import CustomSidebar from 'components/Common/CustomSidebar'
import RouteThrough from 'components/RouteThrough/RouteThrough'
import BusLocation from 'components/BusLocation/BusLocation'
import { busStopData } from 'actions/initialData/busStopData'
import { cloneDeep } from 'lodash'
import { useDispatch } from 'react-redux'
import { getIdBusStopOnClick } from 'redux/actions'
import MarkerBusStop from 'components/MarkerBusStop/MarkerBusStop'

const AllBusStop = () => {
  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  const [allBusStop, setAllBusStop] = useState([])

  useEffect(() => {
    const getAllBusStopInRoutes = cloneDeep(busStopData)
    // filter bus stop
    if (search !== '') {
      const newSearchList = getAllBusStopInRoutes.filter(busstop => {
        return Object.values(busstop.nameBusStop)
          .join('')
          .toLowerCase('')
          .includes(search.toLowerCase())
      })
      setAllBusStop(newSearchList)
    } else {
      setAllBusStop(getAllBusStopInRoutes)
    }
  }, [search])

  const [showSidebar, setShowSidebar] = useState(false)
  const [idBusStop, setIdBusStop] = useState('')
  const handleTarget = e => {
    setIdBusStop(e.currentTarget.id)
    setShowSidebar(!showSidebar)
  }

  // store id bus stop
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIdBusStopOnClick(idBusStop))
  }, [idBusStop])

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

export default AllBusStop
