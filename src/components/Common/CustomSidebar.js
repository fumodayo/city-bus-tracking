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
  const { name, tabLeft, tabRight, compLeft, compRight } = props
  const [isOpen, setIsOpen] = useState(props.show)
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  const toggleOpenSidebar = newOpen => () => {
    setIsOpen(newOpen)
  }

  return (
    <Drawer
      variant="persistent"
      sx={{ overflowY: 'none' }}
      hideBackdrop={true}
      open={isOpen}
    >
      <DrawerHeader
        sx={{ overflowY: 'none', position: 'relative', backgroundColor: '#3597E4' }}
      >
        <Typography style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
          {name}
        </Typography>
        <IconButton onClick={toggleOpenSidebar(false)}>
          <Close fontSize="medium" sx={{ color: '#fff' }} />
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
              <TabPanel style={{ paddingLeft: '0', padding: 0 }} value="1">
                {compLeft}
              </TabPanel>
              <TabPanel style={{ paddingLeft: '0', padding: 0 }} value="2">
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
