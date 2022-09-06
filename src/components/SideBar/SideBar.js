import React, { useState } from 'react'
import { Drawer, IconButton, Typography, Box, Tab, styled } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ChevronLeft } from '@mui/icons-material'
import './SideBar.scss'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const SideBar = ({ isOpen, setIsOpen }) => {
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>System Bus Router Danang:</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 400, p: 3 }}>
        <Box
          style={{
            width: '100%',
            color: '#3597E4',
            backgroundColor: 'inherit',
            fontSize: '1.5rem',
            display: 'flex',
            padding: '0 1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
              </TabList>
            </Box>
            {/* <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel> */}
          </TabContext>
        </Box>
      </Box>
    </Drawer>
  )
}

export default SideBar
