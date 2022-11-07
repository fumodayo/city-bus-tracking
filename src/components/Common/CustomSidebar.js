import React, { useState } from 'react'
import { Drawer, IconButton, Box, Tab, styled, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Close } from '@mui/icons-material'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const CustomSidebar = props => {
  const { name, tabLeft, tabRight, compLeft, compRight, show } = props
  const [isOpen, setIsOpen] = useState(show)
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
      <DrawerHeader
        sx={{
          overflowY: 'none',
          position: 'relative',
          backgroundColor: '#3597E4'
        }}
      >
        <Typography
          style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}
        >
          {name}
        </Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <Close fontSize="medium" sx={{ color: '#fff' }} />
        </IconButton>
      </DrawerHeader>
      <Box
        sx={{
          width: 400,
          height: '100%',
          p: 3,
          overflow: 'hidden'
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
                <Tab
                  style={{ width: '50%', textTransform: 'none' }}
                  label={tabLeft}
                  value="1"
                />
                <Tab
                  style={{ width: '50%', textTransform: 'none' }}
                  label={tabRight}
                  value="2"
                />
              </TabList>
            </Box>
            <Box>
              <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="1">
                {compLeft}
              </TabPanel>
              <TabPanel style={{ padding: '12px 0px 10px 0px' }} value="2">
                {compRight}
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Box>
    </Drawer>
  )
}

export default CustomSidebar
