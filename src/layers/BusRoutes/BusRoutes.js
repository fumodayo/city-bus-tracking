import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import './BusRoutes.scss'
import FilterBusRoutes from 'components/FilterBusRoutes/FilterBusRoutes'
import AllBusStop from 'components/AllBusStop/AllBusStop'

const BusRoutes = () => {
  const [tabValue, setTabValue] = useState('1')
  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <div className="sidebar-busroutes">
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
          <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="1">
            <FilterBusRoutes />
          </TabPanel>
          <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="2">
            <AllBusStop />
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default BusRoutes
