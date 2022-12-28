import React, { useState } from 'react'
import {
  Box,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Button
} from '@mui/material'
import { useEffect } from 'react'

const CreateBusStops = ({ setDataBusStops }) => {
  const [serviceList, setServiceList] = useState([{ service: '' }])

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target
    const list = [...serviceList]
    list[index][name] = value
    setServiceList(list)
  }

  const handleServiceRemove = index => {
    const list = [...serviceList]
    list.splice(index, 1)
    setServiceList(list)
  }

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: '' }])
  }

  useEffect(() => {
    setDataBusStops(serviceList)
  }, [serviceList])

  return (
    <Box>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Bước 2: Tạo bến xe buýt
      </Typography>
      <Box sx={{ textAlign: 'left' }}>
        {serviceList.map((singleService, index) => (
          <Box key={index}>
            <Typography>Bến xe thứ {index + 1}</Typography>
            <Box style={{ paddingTop: '20px' }}>
              <TextField
                autoFocus
                name="nameBusStop"
                label="Tên bến xe buýt"
                value={singleService.nameBusStop}
                onChange={e => handleServiceChange(e, index)}
                required
              />
              <Box style={{ paddingTop: '20px' }}>
                <InputLabel>Toạ độ của bến xe buýt:</InputLabel>
                <TextField
                  name="longitude"
                  label="Kinh độ"
                  type="number"
                  value={singleService.longitude}
                  onChange={e => handleServiceChange(e, index)}
                  required
                />
                <TextField
                  name="latitude"
                  label="Vĩ độ"
                  type="number"
                  value={singleService.latitude}
                  onChange={e => handleServiceChange(e, index)}
                  required
                />
              </Box>
              <Box style={{ paddingTop: '20px' }}>
                <InputLabel>Thời gian di chuyển giữa 2 bến:</InputLabel>
                <Input
                  name="travelTime"
                  value={singleService.travelTime}
                  onChange={e => handleServiceChange(e, index)}
                  type="number"
                  endAdornment={
                    <InputAdornment position="end">phút</InputAdornment>
                  }
                />
              </Box>
              <Box style={{ paddingTop: '20px' }}>
                {serviceList.length !== 1 && (
                  <Button onClick={() => handleServiceRemove(index)}>
                    Xóa
                  </Button>
                )}
              </Box>
            </Box>
            {serviceList.length - 1 === index && serviceList.length < 100 && (
              <Button onClick={handleServiceAdd}>Thêm</Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default CreateBusStops
