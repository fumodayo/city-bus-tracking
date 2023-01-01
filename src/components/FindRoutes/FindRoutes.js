import React from 'react'
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material'
import InputField from 'components/FindRoutes/InputField'
import MarkerBlue from '../../images/markerblue.png'
import MarkerRed from '../../images/markerred.png'
import { Layer, Marker, Source } from 'react-map-gl'
import ArrowDirection from 'components/FindRoutes/ArrowDirection'
import { useDirections } from 'hooks/useDirections'
import './FindRoutes.scss'
import { setSearchLocation } from 'redux/slices/routes'
import { useDispatch, useSelector } from 'react-redux'
import { useAddress } from 'hooks/useAddress'
import { MyLocation, Send } from '@mui/icons-material'
import { useLocationNear } from 'hooks/useLocationNear'
import { useEffect } from 'react'
import { useState } from 'react'
import { useBusStop } from 'hooks/useBusStop'
import MarkerBusStop from 'components/Common/MarkerBusStop/MarkerBusStop'

const FindRoutes = () => {
  const directions = useDirections()
  const dispatch = useDispatch()
  const address = useAddress()
  const busstops = useBusStop()

  const points = useSelector(state => state.routes.direction)
  const [beginPoint, setBeginPoint] = useState([])
  const [endPoint, setEndPoint] = useState([])

  useEffect(() => {
    let start,
      end = []
    if (points.id === 'begin') {
      start = points.location
      setBeginPoint(start)
    }
    if (points.id === 'end') {
      end = points.location
      setEndPoint(end)
    }
  }, [points])

  const pointNear = useLocationNear()
  const [location, setLocation] = useState([])

  const handleFindNearBusStop = () => {
    const point = busstops.filter(i => i.id === pointNear)
    setLocation(point)
  }

  useEffect(() => {
    location.map(i =>
      setTimeout(() => {
        dispatch(
          setSearchLocation({
            id: 'end',
            location: [i.location.lng, i.location.lat]
          })
        )
      }, 500)
    )
  }, [location, dispatch])

  const handleGetCurrentUserLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function success(pos) {
      dispatch(
        setSearchLocation({
          id: 'begin',
          location: [pos.coords.longitude, pos.coords.latitude]
        })
      )
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <>
      <div className="sidebar-findrouter">
        <Paper
          component="form"
          sx={{
            display: 'inline-block',
            width: '90%',
            borderRadius: '15px',
            boxShadow: '0px 0px 7px 2px rgb(0 0 0 / 15%)',
            backgroundColor: '#ffffff',
            padding: '10px 0px',
            position: 'relative',
            margin: '1rem',
            transition: 'all 2s ease'
          }}
        >
          <div className="input-box pos-relative">
            <Tooltip title="Địa điểm bắt đầu">
              <img src={MarkerBlue} alt="marker-blue" />
            </Tooltip>
            <InputField
              idInput={'begin'}
              placeholder={'Nhập địa điểm bắt đầu'}
            />
            <Tooltip title="Tọa độ hiện tại của bạn">
              <Button
                onClick={handleGetCurrentUserLocation}
                startIcon={<MyLocation style={{ fontSize: '20px' }} />}
              />
            </Tooltip>
          </div>
          <div className="line"></div>
          <div className="input-box pos-relative">
            <Tooltip title="Địa điểm kết thúc">
              <img src={MarkerRed} alt="marker-red" />
            </Tooltip>
            <InputField
              idInput={'end'}
              placeholder={'Nhập địa điểm kết thúc'}
            />
          </div>
        </Paper>
        <Button variant="contained" onClick={handleFindNearBusStop}>
          Tìm trạm xe buýt
        </Button>
        <Typography style={{ marginTop: 10, fontSize: '20px' }}>
          Dẫn đường:
        </Typography>
        <Box
          style={{
            paddingLeft: '0',
            maxHeight: '70vh',
            overflowY: 'scroll'
          }}
        >
          <Box>
            {address?.id && directions?.beginCords && (
              <Typography style={{ color: '#000' }}>
                Từ{' '}
                {address.id === 'begin'
                  ? address.name
                  : 'tọa độ ' +
                    directions?.beginCords[0] +
                    ',' +
                    directions?.beginCords[1]}{' '}
                đến{' '}
                {address.id === 'end'
                  ? address.name
                  : 'tọa độ ' +
                    directions?.endCords[0] +
                    ',' +
                    directions?.endCords[1]}
              </Typography>
            )}
            {Object.keys(directions).length !== 0 && (
              <Typography style={{ color: '#000' }}>
                Tổng thời gian: {Math.floor(directions?.duration / 60)} phút{' '}
                {`(`}
                {Math.floor(directions?.distance / 1000)} km{`)`}
              </Typography>
            )}
          </Box>
          <hr />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px'
            }}
          >
            {directions?.steps &&
              directions?.steps.map(step => (
                <>
                  <ArrowDirection arrow={step?.guide} />
                  <Typography
                    style={{
                      textAlign: 'left',
                      justifyContent: 'left',
                      lineHeight: '30px'
                    }}
                  >
                    {step.name}
                    <Typography style={{ color: '#000' }}>
                      khoảng{' '}
                      {step?.distance > 1000
                        ? `${Math.floor(step?.distance / 1000)} km`
                        : `${Math.floor(step?.distance)} m`}
                      {` (`}
                      {step?.duration > 60
                        ? `${Math.floor(step?.duration / 60)} phút`
                        : `${Math.floor(step?.duration)} giây`}
                      {`)`}
                      <hr />
                    </Typography>
                  </Typography>
                </>
              ))}
          </Box>
        </Box>
      </div>
      {directions?.map && (
        <Source id="polylineLayer" type="geojson" data={directions?.map}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': '#00b0ff',
              'line-width': 5
            }}
          />
        </Source>
      )}
      {beginPoint.length > 0 && (
        <>
          <Marker
            longitude={beginPoint[0]}
            latitude={beginPoint[1]}
            draggable
            onDrag={e =>
              setTimeout(() => {
                dispatch(
                  setSearchLocation({
                    id: 'begin',
                    location: [e.lngLat.lng, e.lngLat.lat]
                  })
                )
              }, 500)
            }
            anchor="bottom"
          >
            <img
              style={{ height: 30, width: 30, cursor: 'pointer' }}
              src={MarkerBlue}
              alt="marker-blue"
            />
          </Marker>
        </>
      )}
      {endPoint.length > 0 && (
        <>
          <Marker
            longitude={endPoint[0]}
            latitude={endPoint[1]}
            draggable
            onDrag={e =>
              setTimeout(() => {
                dispatch(
                  setSearchLocation({
                    id: 'end',
                    location: [e.lngLat.lng, e.lngLat.lat]
                  })
                )
              }, 500)
            }
            anchor="bottom"
          >
            <img
              style={{ height: 30, width: 30, cursor: 'pointer' }}
              src={MarkerRed}
              alt="marker-red"
            />
          </Marker>
        </>
      )}
      {location.map(i => (
        <>
          {location && (
            <MarkerBusStop
              nameBusStop={i.nameBusStop}
              locationBusStop={i.location}
              idBusStop={i.id}
            />
          )}
        </>
      ))}
    </>
  )
}

export default FindRoutes
