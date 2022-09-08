import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, InputBase, Paper, Tab, Typography } from '@mui/material'
import { busRouterData } from './busRouterData'
import './BusRouter.scss'

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
            <Tab style={{ width: '50%' }} label="Tuyến" value="1" />
            <Tab style={{ width: '50%' }} label="Trạm dừng" value="2" />
          </TabList>
        </Box>
        <Box>
          <TabPanel style={{ paddingLeft: '0' }} value="1">
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 320,
                border: 'none',
                borderRadius: '15px',
                boxShadow: '0px 0px 7px 2px rgb(0 0 0 / 15%)',
                backgroundColor: '#ffffff',
                height: '3em',
                fontSize: '1rem'
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nhập tên tuyến..."
                inputProps={{ 'aria-label': 'Tìm tuyến xe buýt' }}
              />
            </Paper>
            <Box
              sx={{
                overflowY: 'none',
                margin: '1rem 0rem 2.5rem 0rem'
              }}
            >
              {busRouterData.map(busrouter => (
                <div
                  key={busrouter.id}
                  className="row align-items-center h-100"
                >
                  <div className="small-3">
                    <div className="route-no text-center">
                      <span>{busrouter.nameBusRouter}</span>
                    </div>
                  </div>

                  <div className="small-7">
                    <p
                      className="code-route"
                    >
                      {busrouter.name}
                    </p>
                    <p style={{ color: '#000', fontSize: '18px' }}>
                      {busrouter.description}
                    </p>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </Box>
          </TabPanel>
          <TabPanel style={{ width: '50%', paddingLeft: '0' }} value="2">
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 320,
                border: 'none',
                borderRadius: '15px',
                boxShadow: '0px 0px 7px 2px rgb(0 0 0 / 15%)',
                backgroundColor: '#ffffff',
                height: '3em',
                fontSize: '1rem'
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nhập tên trạm dừng..."
                inputProps={{ 'aria-label': 'Tìm kiếm trạm dừng' }}
              />
            </Paper>
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default BusRouter
