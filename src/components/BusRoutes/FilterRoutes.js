import React, { useState, useEffect } from 'react'
import { Checkbox, Paper } from '@mui/material'
import FormInput from 'components/Common/FormInput'
import CustomSidebar from 'components/Common/CustomSidebar'
import ListBusStopInRoute from 'components/BusRoutes/ListBusStopInRoute'
import { useDispatch } from 'react-redux'
import FilterTravelMap from 'components/BusRoutes/FilterTravelMap'
import { setFilterRoutes } from 'redux/slices/routes'
import { useBusRoutes } from 'hooks/useBusRoutes'

const FilterRoutes = () => {
  const routes = useBusRoutes()

  const [searchRoute, setSearchRoute] = useState([])
  // Get word from input form to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  useEffect(() => {
    setSearch(search)

    const getBusRoutes = routes.filter(route => route.directionRoute === 'turn')

    // Filter search
    if (search !== '') {
      const newSearchList = getBusRoutes.filter(route => {
        return Object.values(route)
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      setSearchRoute(newSearchList)
    } else {
      setSearchRoute(getBusRoutes)
    }
  }, [search, routes])

  // Get checked in list bus route
  const handleChangeCheckboxRoute = e => {
    const { value: routeName, checked } = e.target
    const busroutesdatachangebycheckbox = searchRoute.map(route =>
      route.codeBusRoute === routeName
        ? { ...route, isChecked: checked }
        : route
    )
    setSearchRoute(busroutesdatachangebycheckbox)
  }

  // store search route
  const dispatch = useDispatch()
  useEffect(() => {
    const routesChange = searchRoute
      .filter(route => route.isChecked)
      ?.map(i => i.codeBusRoute)
    dispatch(setFilterRoutes(routesChange))
  }, [searchRoute])

  // show sidebar & get id in attribute element
  const [showSidebar, setShowSidebar] = useState(false)
  const [busRouteId, setBusRouteId] = useState('')
  const handleGetIDRoute = e => {
    setBusRouteId(e.currentTarget.id)
    setShowSidebar(!showSidebar)
  }

  const [nameBusRoute, setNameBusRoute] = useState('')
  const [nameCodeRoute, setNameCodeRoute] = useState('')
  useEffect(() => {
    const nameRoute = routes.filter(i => i.id === busRouteId)[0]?.nameRoute
    setNameBusRoute(nameRoute)

    const coderoute = routes.filter(i => i.id === busRouteId)[0]?.codeBusRoute
    setNameCodeRoute(coderoute)
  }, [busRouteId, routes])

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
        <FormInput
          onChange={handleChangeWordSearch}
          placeholder={'Nhập tên tuyến...'}
        />
      </Paper>
      <div className="scroll-content">
        <FilterTravelMap />
        {searchRoute.map(route => (
          <div key={route.id}>
            <div className="filters-routes-column">
              <div
                style={{ cursor: 'pointer' }}
                id={route.id}
                className="text-filters row align-items-center h-100"
                onClick={handleGetIDRoute}
              >
                <div className="small-3">
                  <div
                    className="route-no text-center"
                    style={{
                      background: `${route.colorRoute}`
                    }}
                  >
                    <span>{route.codeBusRoute}</span>
                  </div>
                </div>

                <div className="small-7">
                  <p className="code-route">{route.codeBusRoute}</p>
                  <p className="code-desc">{route.nameRoute}</p>
                </div>
              </div>
              <div className="small-2">
                <div className="text-center">
                  <Checkbox
                    id={route.id}
                    value={route.codeBusRoute}
                    onChange={handleChangeCheckboxRoute}
                    checked={route?.isChecked || false}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 30
                      }
                    }}
                  />
                </div>
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
            compLeft={
              <ListBusStopInRoute
                nameCodeRoute={nameCodeRoute}
                turnRoute={'turn'}
              />
            }
            compRight={
              <ListBusStopInRoute
                nameCodeRoute={nameCodeRoute}
                turnRoute={'return'}
              />
            }
          />
        )}
      </div>
    </div>
  )
}

export default FilterRoutes
