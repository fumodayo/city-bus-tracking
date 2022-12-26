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
import { useTravel } from 'hooks/useTravel'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Resizer from 'react-image-file-resizer'
import { Send } from '@mui/icons-material'

const EditTravels = () => {
  let { travelId } = useParams()
  const dataTravels = useTravel()
  const [travels, setTravels] = useState([])

  useEffect(() => {
    const findDataWithID = dataTravels.find(i => i.id === travelId)
    setTravels(findDataWithID)
  }, [travelId, dataTravels])

  const [location, setLocation] = useState({
    lng: '',
    lat: ''
  })

  const updatedLocationFields = field => {
    const { value, name } = field
    console.log(field)
    // setLocation(prevValue => {
    //   if (name === 'longitude') {
    //     return {
    //       lng: value,
    //       lat: prevValue.lat
    //     }
    //   } else if (name === 'latitude') {
    //     return {
    //       lng: prevValue.lng,
    //       lat: value
    //     }
    //   }
    // })
  }

  const updatedFormTravels = fields => {
    console.log(fields)
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

  const [rows, setRows] = useState([])

  const handleSubmit = () => {
    const data = {
      ...travels,
      location: location,
      image: image,
      imageDesc: travels.title
    }
    setRows([...rows, data])
  }

  return (
    <Box>
      <Typography>Chỉnh sửa địa điểm du lịch</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={travels?.title}
            type="text"
            label="Tên địa điểm"
            onChange={e => updatedFormTravels({ title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ minWidth: 200 }}>
            <InputLabel>Loại Hình Du lịch</InputLabel>
            <Select
              value={travels?.typeLocation || 'discover'}
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
            value={travels?.locationName}
            type="text"
            label="Địa chỉ"
            onChange={e => updatedFormTravels({ locationName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            value={travels?.locationLink}
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
            value={travels?.location?.lng}
            onChange={e => updatedFormTravels({ lng: e.target.value })}
            required
          />
          <TextField
            name="latitude"
            label="Vĩ độ"
            type="number"
            value={travels?.location?.lat}
            onChange={e => updatedFormTravels({ lat: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Mô tả về địa điểm: </InputLabel>
          <TextareaAutosize
            minRows={6}
            style={{ width: 400 }}
            value={travels?.description}
            type="text"
            label="Giới thiệu về địa điểm"
            onChange={e => updatedFormTravels({ description: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '5px 0 5px 0'
          }}
        >
          Hình ảnh địa điểm
        </Typography>
        <Box>
          {travels?.image && (
            <img
              style={{
                width: '300px',
                height: '300px',
                border: '3px solid #333333',
                borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',
                '&::before': {
                  content: '',
                  border: '2px solid #353535',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform:
                    'translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg)',
                  borderRadius: ' 1% 1% 2% 4% / 2% 6% 5% 4%'
                }
              }}
              src={travels?.image}
              alt={travels?.image}
            />
          )}
        </Box>
        <Box sx={{ padding: '20px 0 20px 0' }}>
          <Button
            variant="contained"
            component="label"
            sx={{ fontWeight: 'bold' }}
          >
            Tải hình ảnh lên
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={convert2base64}
            />
          </Button>
        </Box>
      </Grid>
      <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
        Chỉnh sửa
      </Button>
    </Box>
  )
}

export default EditTravels
