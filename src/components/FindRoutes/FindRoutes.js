import React, { useState, useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import InputField from 'components/InputField/InputField'
import MarkerBlue from '../../images/markerblue.png'
import MarkerRed from '../../images/markerred.png'
import { API_KEY_MAPBOX } from 'config/constant'
import './FindRoutes.scss'
import { useSelector } from 'react-redux'
import { getLocationDirectionsByInputSelector } from 'redux/selectors'
import { Layer, Marker, Source } from 'react-map-gl'
import ArrowDirection from 'components/ArrowDirection/ArrowDirection'

const FindRoutes = () => {
  const points = useSelector(getLocationDirectionsByInputSelector)
  const [beginPoint, setBeginPoint] = useState([])
  const [endPoint, setEndPoint] = useState([])
  const [directionLine, setDirectionLine] = useState([])
  const [stepDirection, setStepDirection] = useState([])
  const [directionData, setDirectionData] = useState(false)
  useEffect(() => {
    if (beginPoint.length !== 0 && endPoint.length !== 0) {
      getRoute(beginPoint, endPoint)
    }

    async function getRoute(start, end) {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${API_KEY_MAPBOX}&language=vi`,
        { method: 'GET' }
      )
      const json = await query.json()
      const data = json.routes[0]
      setDirectionData(data)

      // data route render in map
      const route = data.geometry.coordinates
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      }
      setDirectionLine(geojson)

      // steps route
      const steps = data.legs[0].steps
      setStepDirection(steps)
    }
  }, [beginPoint, endPoint])

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

  return (
    <>
      <div className="sidebar-findrouter">
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            alignItems: 'center',
            width: '90%',
            border: 'none',
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
            <img src={MarkerRed} alt="marker-red" />
            <InputField
              idInput={'begin'}
              placeholder={'Nhập địa điểm bắt đầu'}
            />
          </div>
          <div className="line"></div>
          <div className="input-box pos-relative">
            <img src={MarkerBlue} alt="marker-blue" />
            <InputField
              idInput={'end'}
              placeholder={'Nhập địa điểm kết thúc'}
            />
          </div>
        </Paper>
        <Typography style={{ fontSize: '20px' }}>Dẫn đường:</Typography>
        <Box
          style={{
            paddingLeft: '0',
            maxHeight: '70vh',
            overflowY: 'scroll'
          }}
        >
          {directionData && (
            <Box>
              <Typography style={{ color: '#000' }}>
                Từ {beginPoint[0]}, {beginPoint[1]} đến {endPoint[0]},
                {endPoint[1]}
              </Typography>
              <Typography style={{ color: '#000' }}>
                Tổng thời gian: {Math.floor(directionData?.duration / 60)} phút{' '}
                {`(`}
                {Math.floor(directionData?.distance / 1000)} km{`)`}
              </Typography>
            </Box>
          )}
          <hr />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px'
            }}
          >
            {stepDirection.map(step => (
              <>
                <ArrowDirection arrow={step.maneuver.modifier} />
                <Typography
                  style={{
                    textAlign: 'left',
                    justifyContent: 'left',
                    lineHeight: '30px'
                  }}
                >
                  {step.maneuver.instruction}
                  <Typography style={{ color: '#000' }}>
                    khoảng{' '}
                    {step.distance > 1000
                      ? `${Math.floor(step.distance / 1000)} km`
                      : `${Math.floor(step.distance)} m`}
                    {` (`}
                    {step.duration > 60
                      ? `${Math.floor(step.duration / 60)} phút`
                      : `${Math.floor(step.duration)} giây`}
                    {`)`}
                    <hr />
                  </Typography>
                </Typography>
              </>
            ))}
          </Box>
        </Box>
      </div>
      {directionLine && (
        <Source id="polylineLayer" type="geojson" data={directionLine}>
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
      {beginPoint.length !== 0 && (
        <Marker
          latitude={beginPoint[1]}
          longitude={beginPoint[0]}
          anchor="bottom"
        >
          <img
            style={{ height: 30, width: 30, cursor: 'pointer' }}
            src={MarkerRed}
            alt="marker"
          />
        </Marker>
      )}
      {endPoint.length !== 0 && (
        <Marker latitude={endPoint[1]} longitude={endPoint[0]} anchor="bottom">
          <img
            style={{ height: 30, width: 30, cursor: 'pointer' }}
            src={MarkerBlue}
            alt="marker"
          />
        </Marker>
      )}
    </>
  )
}

export default FindRoutes
