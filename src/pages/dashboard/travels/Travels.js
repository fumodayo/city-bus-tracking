import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material'
import Resizer from 'react-image-file-resizer'

const Travels = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const initialTravels = {
    title: '',
    typeLocation: 'discover',
    image: '',
    imageDesc: '',
    description: '',
    locationLink: '',
    locationName: ''
  }

  const [location, setLocation] = useState({
    lng: '',
    lat: ''
  })

  const updatedLocationFields = field => {
    const { value, name } = field
    setLocation(prevValue => {
      if (name === 'longitude') {
        return {
          lng: value,
          lat: prevValue.lat
        }
      } else if (name === 'latitude') {
        return {
          lng: prevValue.lng,
          lat: value
        }
      }
    })
  }

  const [travels, setTravels] = useState(initialTravels)
  const updatedFormTravels = fields => {
    setTravels(newData => {
      return { ...newData, ...fields }
    })
  }

  // resize image base64 to (250x250)
  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri)
        },
        'base64'
      )
    })

  const [image, setImage] = useState('')
  const convert2base64 = async e => {
    const file = e.target.files[0]
    const reader = await resizeFile(file)
    setImage(reader)
  }

  const handleSubmit = () => {
    travels['location'] = location
    travels['image'] = image
    travels['imageDesc'] = travels.title
    console.log(travels)
  }

  return (
    <Box>
      <Typography>Tạo địa điểm du lịch: </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={travels.title}
            type="text"
            label="Tên địa điểm"
            onChange={e => updatedFormTravels({ title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ minWidth: 200 }}>
            <InputLabel>Loại Hình Du lịch</InputLabel>
            <Select
              value={travels.typeLocation}
              onChange={e =>
                updatedFormTravels({ typeLocation: e.target.value })
              }
            >
              <MenuItem value={'discover'}>Khám phá</MenuItem>
              <MenuItem value={'cultural'}>Văn hóa</MenuItem>
              <MenuItem value={'checking'}>Chụp ảnh</MenuItem>
              <MenuItem value={'center'}>Trung tâm vui chơi</MenuItem>
              <MenuItem value={'night'}>Vui chơi về đêm</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={travels.locationName}
            type="text"
            label="Địa chỉ"
            onChange={e => updatedFormTravels({ locationName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={travels.locationLink}
            type="text"
            label="Địa chỉ trên google map"
            onChange={e => updatedFormTravels({ locationLink: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Toạ độ của địa điểm:</InputLabel>
          <TextField
            name="longitude"
            label="Kinh độ"
            type="number"
            value={location.lng}
            onChange={e => updatedLocationFields(e.target)}
            required
          />
          <TextField
            name="latitude"
            label="Vĩ độ"
            type="number"
            value={location.lat}
            onChange={e => updatedLocationFields(e.target)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <InputLabel>Thêm hình ảnh cho địa điểm:</InputLabel>
            {image && (
              <img style={{ width: '400px' }} src={image} alt={'test'} />
            )}
          </Box>
          <TextField type="file" onChange={convert2base64} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Mô tả về địa điểm: </InputLabel>
          <TextareaAutosize
            minRows={6}
            style={{ width: 400 }}
            value={travels.description}
            type="text"
            label="Giới thiệu về địa điểm"
            onChange={e => updatedFormTravels({ description: e.target.value })}
          />
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>Xác nhận</Button>
    </Box>
  )
}

export default Travels
