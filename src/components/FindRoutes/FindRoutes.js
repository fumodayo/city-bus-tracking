import React, { useState, useEffect } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Typography
} from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import InputField from 'components/InputField/InputField'
import MarkerBlue from '../../images/markerblue.png'
import MarkerRed from '../../images/markerred.png'
import { API_KEY_MAPBOX } from 'config/constant'
import './FindRoutes.scss'
import { useSelector } from 'react-redux'
import { getLocationDirectionsByInputSelector } from 'redux/selectors'
import { Layer, Source } from 'react-map-gl'

const FindRoutes = () => {
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  const points = useSelector(getLocationDirectionsByInputSelector)
  const [beginPoint, setBeginPoint] = useState([])
  const [endPoint, setEndPoint] = useState([])
  const [directionLine, setDirectionLine] = useState([])
  const [stepDirection, setStepDirection] = useState([])
  const [directionData, setDirectionData] = useState({})
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
  console.log(stepDirection)
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
            <TravelExploreIcon style={{ cursor: 'pointer' }} />
          </div>
          <div className="line"></div>
          <div className="input-box pos-relative">
            <img src={MarkerBlue} alt="marker-blue" />
            <InputField
              idInput={'end'}
              placeholder={'Nhập địa điểm kết thúc'}
            />
            <TravelExploreIcon style={{ cursor: 'pointer' }} />
          </div>
        </Paper>
        <Typography style={{ fontSize: '20px' }}>Dẫn đường:</Typography>
        <Box
          style={{ paddingLeft: '0', maxHeight: '80vh', overflowY: 'scroll' }}
        >
          {/* <Box>
            <Typography>
              Quãng đường: {Math.floor(directionData?.distance / 1000) | 0} km
            </Typography>
            <Typography>
              Thời gian: {Math.floor(directionData?.duration / 60) | 0} phút
            </Typography>
          </Box> */}
          <ListItem style={{ display: 'flex', flexDirection: 'column' }}>
            {stepDirection.map(step => (
              <ListItemText
                style={{ textAlign: 'left', justifyContent: 'left' }}
              >
                {step.maneuver.instruction}
              </ListItemText>
            ))}
          </ListItem>
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
    </>
  )
}

export default FindRoutes
