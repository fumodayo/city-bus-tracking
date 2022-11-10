import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Paper, Tab, Typography } from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import InputField from 'components/InputField/InputField'
import MarkerBlue from '../../images/markerblue.png'
import MarkerRed from '../../images/markerred.png'
import './FindRoutes.scss'

const FindRoutes = () => {
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
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
          <InputField placeholder={'Nhập địa điểm bắt đầu'} />
          <TravelExploreIcon style={{ cursor: 'pointer' }} />
        </div>
        <div className="line"></div>
        <div className="input-box pos-relative">
          <img src={MarkerBlue} alt="marker-blue" />
          <InputField placeholder={'Nhập địa điểm kết thúc'} />
          <TravelExploreIcon style={{ cursor: 'pointer' }} />
        </div>
      </Paper>
      <Typography style={{ fontSize: '22px' }}>SỐ TUYẾN TỐI ĐA:</Typography>
      <TabContext value={tabValue}>
        <Box>
          <TabList onChange={handleChangeTab} aria-label="lab">
            <Tab
              style={{ width: '50%', textTransform: 'none' }}
              label="1 tuyến"
              value="1"
            />
            <Tab
              style={{ width: '50%', textTransform: 'none' }}
              label="2 tuyến"
              value="2"
            />
          </TabList>
        </Box>
        <Box>
          <TabPanel style={{ paddingLeft: '0' }} value="1">
            Turn
          </TabPanel>
          <TabPanel style={{ paddingLeft: '0' }} value="2">
            Turn/ Return
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default FindRoutes
