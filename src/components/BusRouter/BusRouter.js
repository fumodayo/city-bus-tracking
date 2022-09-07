import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, InputBase, Paper, Tab } from '@mui/material'

const BusRouter = () => {
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <div className="sidebar-busroute">
      <TabContext value={tabValue}>
        <Box>
          <TabList onChange={handleChangeTab} aria-label="lab">
            <Tab style={{ width: '50%' }} label="Tuyen" value="1" />
            <Tab style={{ width: '50%' }} label="Tram Dung" value="2" />
          </TabList>
        </Box>
        <Box>
          <TabPanel style={{ width: '50%', paddingLeft: '0' }} value="1">
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 320
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nhap ten tuyen..."
                inputProps={{ 'aria-label': 'search bus router' }}
              />
            </Paper>
          </TabPanel>
          <TabPanel style={{ width: '50%', paddingLeft: '0' }} value="2">
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 320
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nhap ten tram dung..."
                inputProps={{ 'aria-label': 'search bus stop' }}
              />
            </Paper>
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default BusRouter
