import React, { useState, useEffect } from 'react'
import { Checkbox, Paper } from '@mui/material'
import FormInput from 'components/Common/FormInput'
import CustomSidebar from 'components/Common/CustomSidebar'
import ListBusStop from 'components/ListBusStop/ListBusStop'
import { useDispatch } from 'react-redux'
import { searchFilterChange } from 'redux/actions'
import { locationData } from 'actions/initialData/locationData'
import { cloneDeep } from 'lodash'
import TravelLocation from 'components/TravelLocation/TravelLocation'

const FilterRouter = () => {
  const [searchRoute, setSearchRoute] = useState([])

  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  useEffect(() => {
    // Handle filter search
    setSearch(search)
    const busdata = cloneDeep(locationData)
    const busRoutesData = busdata.filter(route => route.directionRoute === 'return')
    if (search !== '') {
      const newSearchList = busRoutesData.filter(route => {
        return Object.values(route).join('').toLowerCase().includes(search.toLowerCase())
      })
      setSearchRoute(newSearchList)
    } else {
      setSearchRoute(busRoutesData)
    }
  }, [search])

  // Handle multi checkbox
  const handleChangeCheckboxRoute = e => {
    const { value: routeName, checked } = e.target
    const busroutesdatachangebycheckbox = searchRoute.map(route =>
      route.nameBusRouter === routeName ? { ...route, isChecked: checked } : route
    )
    setSearchRoute(busroutesdatachangebycheckbox)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(searchFilterChange(searchRoute))
  }, [searchRoute])

  const [showSidebar, setShowSidebar] = useState(false)
  const [nameBusRoute, setNameBusRoute] = useState('')

  const handleTarget = e => {
    setNameBusRoute(e.target.innerText)
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="filter-router">
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
        <FormInput onChange={handleChangeWordSearch} placeholder={'Nhập tên tuyến...'} />
      </Paper>
      <div className="scroll-content">
        <TravelLocation />
        {searchRoute.map(busrouter => (
          <div
            style={{ cursor: 'pointer' }}
            key={busrouter.id}
            className="row align-items-center h-100"
          >
            <div className="small-3">
              <div
                className="route-no text-center"
                style={{ background: `${busrouter.color}` }}
              >
                <span onClick={handleTarget}>{busrouter.nameBusRouter}</span>
              </div>
            </div>

            <div className="small-7">
              <p className="code-route">{busrouter.nameBusRouter}</p>
              <p className="code-desc">{busrouter.name}</p>
            </div>
            <div className="small-2">
              <div className="text-center">
                <Checkbox
                  id={busrouter.id}
                  value={busrouter.nameBusRouter}
                  onChange={handleChangeCheckboxRoute}
                  checked={busrouter?.isChecked || false}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              </div>
            </div>
            <hr style={{ marginTop: '5px' }}></hr>
          </div>
        ))}
        {showSidebar && (
          <CustomSidebar
            show={true}
            name={nameBusRoute}
            tabLeft={'Xem lượt đi'}
            tabRight={'Xem lượt về'}
            compLeft={<ListBusStop nameBusRoute={nameBusRoute} turnRoute={'turn'} />}
            compRight={<ListBusStop nameBusRoute={nameBusRoute} turnRoute={'return'} />}
          />
        )}
      </div>
    </div>
  )
}

export default FilterRouter
