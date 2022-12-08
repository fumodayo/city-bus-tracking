import { Box, Grid, Typography } from '@mui/material'
import { useBusRoutes } from 'hooks/useBusRoutes'
import { useBusStop } from 'hooks/useBusStop'
import { useTravel } from 'hooks/useTravel'
import React from 'react'
import { useEffect } from 'react'

const Main = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const busroutes = useBusRoutes()
  const busstops = useBusStop()
  const travels = useTravel()

  return (
    <Box sx={{ display: 'flex', padding: '20px' }}>
      <Box
        sx={{
          width: 300,
          height: 150,
          borderRadius: '20px',
          backgroundColor: '#4f5bd5',
          color: '#fff',
          margin: '20px',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
          '&:hover': {
            backgroundColor: '#4f5bd5',
            opacity: [0.9, 0.8, 0.7]
          }
        }}
      >
        <Grid container direction="column" alignItems="center" p={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{
                fontSize: '40px',
                fontWeight: 'bold'
              }}
            >
              {busroutes.length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Tổng số tuyến
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          width: 300,
          height: 150,
          borderRadius: '20px',
          backgroundColor: '#962fbf',
          color: '#fff',
          margin: '20px',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
          '&:hover': {
            backgroundColor: '#962fbf',
            opacity: [0.9, 0.8, 0.7]
          }
        }}
      >
        <Grid container direction="column" alignItems="center" p={2}>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '40px', fontWeight: 'bold' }}>
              {busstops.length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Tổng số trạm xe buýt
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          width: 300,
          height: 150,
          borderRadius: '20px',
          backgroundColor: '#d62976',
          color: '#fff',
          margin: '20px',
          boxShadow:
            'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
          '&:hover': {
            backgroundColor: '#d62976',
            opacity: [0.9, 0.8, 0.7]
          }
        }}
      >
        <Grid container direction="column" alignItems="center" p={2}>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '40px', fontWeight: 'bold' }}>
              {travels.length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Tổng số điểm du lịch
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Main
