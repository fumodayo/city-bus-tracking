import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, InputBase, Paper, Tab, Typography } from '@mui/material'

const FindRouter = () => {
  const [tabValue, setTabValue] = useState('1')

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <div className="sidebar-findrouter">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          alignItems: 'center',
          width: 320
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Nhap dia diem xuat phat"
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Nhap dia diem ket thuc"
        />
      </Paper>
      <Typography>SO TUYEN TOI DA:</Typography>
      <TabContext value={tabValue}>
        <Box>
          <TabList onChange={handleChangeTab} aria-label="lab">
            <Tab style={{ width: '50%' }} label="1 tuyen" value="1" />
            <Tab style={{ width: '50%' }} label="2 tuyen" value="2" />
          </TabList>
        </Box>
        <Box>
          <TabPanel style={{ paddingLeft: '0' }} value="1">
            1 tuyen
          </TabPanel>
          <TabPanel style={{ paddingLeft: '0' }} value="2">
            2 tuyen
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default FindRouter
