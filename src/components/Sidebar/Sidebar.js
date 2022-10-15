import React, { useState } from 'react'
import { Drawer, IconButton, Typography, Box, Tab, styled } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ChevronLeft } from '@mui/icons-material'
import { ChevronRight } from '@mui/icons-material'
import BusRouter from 'components/BusRouter/BusRouter'
import FindRouter from 'components/FindRouter/FindRouter'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Sidebar = props => {
  const { searchRoute, setSearchRoute } = props
  const [isOpen, setIsOpen] = useState(props.show)
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  const toggleOpenSidebar = newOpen => () => {
    setIsOpen(newOpen)
  }

  return (
    <>
      <Box sx={{ mr: 1 }}>
        <IconButton size="large" color="inherit" onClick={toggleOpenSidebar(true)}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Drawer
        variant="persistent"
        sx={{ overflowY: 'none' }}
        hideBackdrop={true}
        open={isOpen}
      >
        <DrawerHeader sx={{ overflowY: 'none' }}>
          <Typography>Hệ thống xe buýt Đà Nẵng</Typography>
          <IconButton onClick={toggleOpenSidebar(false)}>
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
                  <BusRouter searchRoute={searchRoute} setSearchRoute={setSearchRoute} />
                </TabPanel>
                <TabPanel style={{ paddingLeft: '0', padding: 0 }} value="2">
                  <FindRouter />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Sidebar
