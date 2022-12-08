import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'

const CreateInfoBusRoute = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const initialInfoBusRoute = {
    ticketPrice: '',
    busName: '',
    busCapacity: '',
    busOperation: ''
  }

  const [info, setInfo] = useState(initialInfoBusRoute)
  const updateFormInfoBusRoute = fields => {
    setInfo(newData => {
      return { ...newData, ...fields }
    })
  }

  const handleSubmit = () => {
    console.log(info)
  }
  return (
    <Box>
      <Typography>Tạo thông tin cơ bản về tuyến: </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={info.ticketPrice}
            type="text"
            label="Mã số tuyến"
            onChange={e =>
              updateFormInfoBusRoute({ ticketPrice: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={info.busName}
            type="text"
            label="Tên hãng xe"
            onChange={e => updateFormInfoBusRoute({ busName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={info.busCapacity}
            type="text"
            label="Sức chứa của xe"
            onChange={e =>
              updateFormInfoBusRoute({ busCapacity: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={info.busOperation}
            type="text"
            label="Đơn vị vận hàng"
            onChange={e =>
              updateFormInfoBusRoute({ busOperation: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>Xác nhận</Button>
    </Box>
  )
}

export default CreateInfoBusRoute
