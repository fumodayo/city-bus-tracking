import React, { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, InputBase, Paper, Tab } from '@mui/material'
import { busRouterData } from './busRouterData'
import './BusRouter.scss'
import FilterRouter from 'components/FilterRouter/FilterRouter'
import AllBusStop from 'components/AllBusStop/AllBusStop'

const BusRouter = ({ searchRoute, setSearchRoute }) => {
  // Handle event tab Tuyen / Tram dung
  const [tabValue, setTabValue] = useState('1')
  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  useEffect(() => {
    // Handle filter search
    setSearch(search)
    if (search !== '') {
      const newSearchList = busRouterData.filter(route => {
        return Object.values(route)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      setSearchRoute(newSearchList)
    } else {
      setSearchRoute(busRouterData)
    }
  }, [search])

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
                value={search}
                onChange={e => handleChangeWordSearch(e.target.value)}
              />
            </Paper>
            <div className="scroll-content">
              <FilterRouter
                searchRoute={searchRoute}
                setSearchRoute={setSearchRoute}
              />
            </div>
          </TabPanel>
          <TabPanel style={{ paddingLeft: '0' }} value="2">
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
            <div className="scroll-content">
              <AllBusStop />
            </div>
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default BusRouter
