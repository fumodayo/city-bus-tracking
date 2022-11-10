import React, { useEffect, useState } from 'react'
import { routesData } from 'actions/initialData/routesData'
import { busStopData } from 'actions/initialData/busStopData'
import ListBusStop from 'components/ListBusStopInRoute/ListBusStopInRoute'
import CustomSidebar from 'components/Common/CustomSidebar'

const RouteThrough = ({ idBusStop }) => {
  const [routeThrough, setRouteThrough] = useState([])

  useEffect(() => {
    const busStopFindById = busStopData.filter(
      busstop => busstop.id === idBusStop
    )[0]
    const codeBusStop = busStopFindById.codeBusRoute
    const directionBusStop = busStopFindById.directionRoute
    const routebusthroungh = routesData.filter(
      route =>
        route.codeBusRoute === codeBusStop &&
        route.directionRoute === directionBusStop
    )[0]
    setRouteThrough(routebusthroungh)
  }, [idBusStop])

  const [openSidebar, setOpenSidebar] = useState(false)
  const handleOpenSidebarBusList = () => {
    setOpenSidebar(openSidebar => !openSidebar)
  }
  return (
    <>
      <div className="route-through">
        <div className="scroll-content">
          <div
            style={{ cursor: 'pointer' }}
            className="row align-items-center h-100"
            onClick={handleOpenSidebarBusList}
          >
            <div className="small-3">
              <div
                className="route-no text-center"
                style={{ background: `${routeThrough.colorRoute}` }}
              >
                <span>{routeThrough.codeBusRoute}</span>
              </div>
            </div>

            <div className="small-7">
              <p className="code-route">{routeThrough.nameRoute}</p>
              <p
                className="code-desc"
                style={{ fontSize: '14.5px', color: '#1F8BAE' }}
              >
                {routeThrough.directionRoute === 'turn'
                  ? 'Chiều đi'
                  : 'Chiều về'}
              </p>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
      {openSidebar && (
        <CustomSidebar
          show={true}
          name={routeThrough.nameRoute}
          tabLeft={'Xem lượt đi'}
          tabRight={'Xem lượt về'}
          compLeft={
            <ListBusStop
              nameCodeRoute={routeThrough.codeBusRoute}
              turnRoute={'turn'}
            />
          }
          compRight={
            <ListBusStop
              nameCodeRoute={routeThrough.codeBusRoute}
              turnRoute={'return'}
            />
          }
        />
      )}
    </>
  )
}

export default RouteThrough
