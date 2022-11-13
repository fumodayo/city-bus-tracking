import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import InputField from 'components/FindRoutes/InputField'
import MarkerBlue from '../../images/markerblue.png'
import MarkerRed from '../../images/markerred.png'
import { Layer, Marker, Source } from 'react-map-gl'
import ArrowDirection from 'components/ArrowDirection/ArrowDirection'
import './FindRoutes.scss'
import { useDirections } from 'hooks/useDirections'

const FindRoutes = () => {
  const directions = useDirections()

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
          <Box>
            {directions?.beginCords && (
              <Typography style={{ color: '#000' }}>
                Từ {directions?.beginCords[0]}, {directions?.beginCords[1]} đến{' '}
                {directions?.endCords[0]},{directions?.endCords[1]}
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
      {directions?.beginCords && directions?.endCords && (
        <>
          <Marker
            latitude={directions?.beginCords[1]}
            longitude={directions?.beginCords[0]}
            anchor="bottom"
          >
            <img
              style={{ height: 30, width: 30, cursor: 'pointer' }}
              src={MarkerRed}
              alt="marker"
            />
          </Marker>
          <Marker
            latitude={directions?.endCords[1]}
            longitude={directions?.endCords[0]}
            anchor="bottom"
          >
            <img
              style={{ height: 30, width: 30, cursor: 'pointer' }}
              src={MarkerBlue}
              alt="marker"
            />
          </Marker>
        </>
      )}
    </>
  )
}

export default FindRoutes
