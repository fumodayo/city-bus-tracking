import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useBusRoutes } from 'hooks/useBusRoutes'
import { useBusStop } from 'hooks/useBusStop'
import { useTravel } from 'hooks/useTravel'
import { useNavigate } from 'react-router-dom'
import DashBoard from '../DashBoard'

const Main = () => {
  const navigate = useNavigate()
  const busroutes = useBusRoutes()
  const busstops = useBusStop()
  const travels = useTravel()

  return (
    <DashBoard>
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
          onClick={() => navigate('/dashboard/busroutes')}
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
          onClick={() => navigate('/dashboard/busroutes')}
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
          onClick={() => navigate('/dashboard/travels')}
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
    </DashBoard>
  )
}

export default Main
