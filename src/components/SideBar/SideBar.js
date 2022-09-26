import React, { useState } from 'react'
import { Drawer, IconButton, Typography, Box, Tab, styled } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ChevronLeft } from '@mui/icons-material'
import BusRouter from '../BusRouter/BusRouter'
import FindRouter from '../FindRouter/FindRouter'
import './SideBar.scss'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const SideBar = ({ isOpen, setIsOpen, searchRoute, setSearchRoute }) => {
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <Drawer
      variant="persistent"
      sx={{ overflowY: 'none' }}
      hideBackdrop={true}
      open={isOpen}
    >
      <DrawerHeader sx={{ overflowY: 'none' }}>
        <Typography>Hệ thống xe buýt Đà Nẵng</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box
        sx={{
          width: 400,
          p: 3
        }}
      >
        <Box
          style={{
            width: '100%',
            color: '#3597E4',
            backgroundColor: 'inherit',
            fontSize: '1.5rem'
          }}
        >
          <TabContext value={tabValue}>
            <Box>
              <TabList onChange={handleChangeTab} aria-label="lab">
                <Tab style={{ width: '50%' }} label="Tra cứu" value="1" />
                <Tab style={{ width: '50%' }} label="Tìm tuyến" value="2" />
              </TabList>
            </Box>
            <Box>
              <TabPanel style={{ paddingLeft: '0', padding: 0 }} value="1">
                <BusRouter
                  searchRoute={searchRoute}
                  setSearchRoute={setSearchRoute}
                />
              </TabPanel>
              <TabPanel style={{ paddingLeft: '0', padding: 0 }} value="2">
                <FindRouter />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Box>
    </Drawer>
  )
}

export default SideBar
