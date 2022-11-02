import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import { locationData } from 'actions/initialData/locationData'
import FormInput from 'components/Common/FormInput'
import CustomSidebar from 'components/Common/CustomSidebar'
import RouteThrough from 'components/RouteThrough/RouteThrough'
import BusLocation from 'components/BusLocation/BusLocation'

const AllBusStop = () => {
  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  // Get All Bus Stop
  const [allBusStop, setAllBusStop] = useState([])

  useEffect(() => {
    const getAllBusStopInRoutes = locationData
      .map(i =>
        i.route.map(i => {
          let busstop = []
          busstop = [...busstop, i]
          busstop.flat(2)
          return busstop
        })
      )
      .flat(2)
    if (search !== '') {
      const newSearchList =
        getAllBusStopInRoutes.filter(i => {
          return Object.values(i.name)
            .join('')
            .toLowerCase('')
            .includes(search.toLowerCase())
        })
      setAllBusStop(newSearchList)
    } else {
      setAllBusStop(getAllBusStopInRoutes)
    }
  }, [search])

  const [showSidebar, setShowSidebar] =
    useState(false)
  const [idBusStop, setIdBusStop] = useState('')

  const handleTarget = e => {
    setIdBusStop(e.currentTarget.id)
    setShowSidebar(!showSidebar)
  }

  const [nameBusStop, setNameBusStop] =
    useState('')
  useEffect(() => {
    const nameBusStopInList = allBusStop.filter(
      i => i.id === idBusStop
    )[0]?.name
    setNameBusStop(nameBusStopInList)
  }, [idBusStop])

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
          boxShadow:
            '0px 0px 7px 2px rgb(0 0 0 / 15%)',
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
        {allBusStop.map((bus, index) => (
          <div
            key={bus.id}
            className="row align-items-center h-100"
            style={{ cursor: 'pointer' }}
            onClick={handleTarget}
            id={bus.id}
          >
            <div className="small-3 mt-10">
              <div className="route-no text-center">
                <span style={{ fontWeight: 600 }}>
                  {index + 1}
                </span>
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
                {bus.name}
              </p>
            </div>
            <hr></hr>
          </div>
        ))}
        {showSidebar && (
          <CustomSidebar
            show={true}
            name={nameBusStop}
            tabLeft={'Xe sắp tới trạm'}
            tabRight={'Tuyến đi qua'}
            compLeft={
              <BusLocation
                nameBusStop={nameBusStop}
              />
            }
            compRight={
              <RouteThrough
                nameBusStop={nameBusStop}
              />
            }
          />
        )}
      </div>
    </div>
  )
}

export default AllBusStop
