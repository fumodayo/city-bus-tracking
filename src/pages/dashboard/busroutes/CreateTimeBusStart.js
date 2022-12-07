import React, { useState } from 'react'
import {
  Box,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
  Button
} from '@mui/material'

const CreateTimeBusStart = () => {
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

  return (
    <Box>
      <Typography>Tạo thời gian xe xuất bến</Typography>
      <Box sx={{ textAlign: 'left' }}>
        {serviceList.map((singleService, index) => (
          <Box key={index}>
            <Typography>Chuyến thứ {index + 1}</Typography>
            <Box style={{ paddingTop: '20px' }}>
              <InputLabel>Thời gian xe xuất bến:</InputLabel>
              <Input
                autoFocus
                name="travelTime"
                value={singleService.travelTime}
                onChange={e => handleServiceChange(e, index)}
                type="number"
                endAdornment={
                  <InputAdornment position="end">giờ</InputAdornment>
                }
              />
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
                <Button onClick={() => handleServiceRemove(index)}>Xóa</Button>
              )}
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

export default CreateTimeBusStart
