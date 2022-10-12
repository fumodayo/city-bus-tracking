import React, { useState, useEffect } from 'react'
import { Paper, InputBase } from '@mui/material'
import { locationData } from 'actions/initialData/locationData'
import { cloneDeep } from 'lodash'

const AllBusStop = () => {
  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  // Get All Bus Stop
  const [allBusStop, setAllBusStop] = useState([])

  cloneDeep(locationData)
  useEffect(() => {
    const getAllBusStopInRoutes = locationData.map(i =>
      i.route.map(i => {
        let a = []
        a = [...a, i.name]
        a.flat(2)
        return a
      })
    ).flat(2)

    if (search !== '') {
      const newSearchList = getAllBusStopInRoutes.filter(name => {
        return Object.values(name)
          .join('')
          .toLowerCase('')
          .includes(search.toLowerCase())
      })
      setAllBusStop(newSearchList)
    } else {
      setAllBusStop(getAllBusStopInRoutes)
    }
  }, [search])

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
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Nhập tên trạm dừng..."
          inputProps={{ 'aria-label': 'Tìm kiếm trạm dừng' }}
          value={search}
          onChange={e => handleChangeWordSearch(e.target.value)}
        />
      </Paper>
      <div className="scroll-content">
        {allBusStop.map((name, index) => (
          <div key={index} className="row align-items-center h-100">
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
                {name}
              </p>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBusStop
