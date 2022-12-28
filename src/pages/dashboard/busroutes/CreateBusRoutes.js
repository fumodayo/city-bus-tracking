import React from 'react'
import {
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import RichTextEditor from '@mantine/rte'
import { useState } from 'react'

const CreateBusRoutes = ({
  codeBusRoute,
  nameRoute,
  directionRoute,
  drivingJourney,
  lineDistance,
  operatingTime,
  colorRoute,
  updateFormBusRoutes
}) => {
  const [value, onChange] = useState('Mô tả hành trình của tuyến xe buýt')
  
  return (
    <Box>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Bước 1: Tạo tuyến xe buýt
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={codeBusRoute}
            type="text"
            label="Mã số tuyến"
            onChange={e =>
              updateFormBusRoutes({ codeBusRoute: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={nameRoute}
            type="text"
            label="Tên tuyến"
            onChange={e => updateFormBusRoutes({ nameRoute: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Chiều của tuyến</InputLabel>
            <Select
              value={directionRoute}
              onChange={e =>
                updateFormBusRoutes({ directionRoute: e.target.value })
              }
            >
              <MenuItem value={'turn'}>Chiều đi</MenuItem>
              <MenuItem value={'return'}>Chiều về</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Mô tả hành trình</InputLabel>
          <RichTextEditor
            style={{
              height: '300px',
              overflow: 'auto'
            }}
            id="rte"
            value={value}
            onChange={onChange}
            formats={['bold', 'italic', 'underline']}
            controls={[['bold', 'italic', 'underline']]}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
          <FormControl variant="standard">
            <InputLabel>Độ dài của tuyến</InputLabel>
            <Input
              value={lineDistance}
              onChange={e =>
                updateFormBusRoutes({ lineDistance: e.target.value })
              }
              type="number"
              endAdornment={<InputAdornment position="end">km</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={operatingTime}
            type="text"
            label="Thời gian tuyến hoạt động"
            onChange={e =>
              updateFormBusRoutes({ operatingTime: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <TextField
              value={colorRoute}
              type="color"
              label="Màu của tuyến"
              onChange={e =>
                updateFormBusRoutes({ colorRoute: e.target.value })
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateBusRoutes
