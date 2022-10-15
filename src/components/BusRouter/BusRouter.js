import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import './BusRouter.scss'
import FilterRouter from 'components/FilterRouter/FilterRouter'
import AllBusStop from 'components/AllBusStop/AllBusStop'

const BusRouter = ({ searchRoute, setSearchRoute }) => {
  // Handle event tab Tuyen / Tram dung
  const [tabValue, setTabValue] = useState('1')
  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <div className="sidebar-busroute">
      <TabContext value={tabValue}>
        <Box>
          <TabList onChange={handleChangeTab} aria-label="lab">
            <Tab
              style={{ width: '50%', textTransform: 'none' }}
              label="Tuyến"
              value="1"
            />
            <Tab
              style={{ width: '50%', textTransform: 'none' }}
              label="Trạm dừng"
              value="2"
            />
          </TabList>
        </Box>
        <Box>
          <TabPanel style={{ paddingLeft: '0' }} value="1">
            <FilterRouter searchRoute={searchRoute} setSearchRoute={setSearchRoute} />
          </TabPanel>
          <TabPanel style={{ paddingLeft: '0' }} value="2">
            <AllBusStop />
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default BusRouter
