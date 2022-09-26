import React from 'react'
import { Checkbox } from '@mui/material'

const FilterRouter = ({ searchRoute, setSearchRoute }) => {
  // Handle multi checkbox
  const handleChangeCheckboxRoute = e => {
    const { value: routeName, checked } = e.target
    let tempRoute = searchRoute.map(route =>
      route.nameBusRouter === routeName
        ? { ...route, isChecked: checked }
        : route
    )
    setSearchRoute(tempRoute)
  }

  return (
    <div className="filter-router">
      {searchRoute.map(busrouter => (
        <div key={busrouter.id} className="row align-items-center h-100">
          <div className="small-3">
            <div
              className="route-no text-center"
              style={{ background: `${busrouter.color}` }}
            >
              <span>{busrouter.nameBusRouter}</span>
            </div>
          </div>

          <div className="small-7">
            <p className="code-route">{busrouter.name}</p>
            <p
              style={{
                color: '#000',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              {busrouter.description}
            </p>
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
          <hr></hr>
        </div>
      ))}
    </div>
  )
}

export default FilterRouter
