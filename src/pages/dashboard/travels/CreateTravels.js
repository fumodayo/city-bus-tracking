import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import Resizer from 'react-image-file-resizer'
import { Send } from '@mui/icons-material'
import DashBoard from '../DashBoard'
import RichTextEditor from '@mantine/rte'

const CreateTravels = () => {
  const initialTravels = {
    id: Math.random(),
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

  console.log(rows)

  // console.log(travels)

  // const columns = [
  //   {
  //     field: 'title',
  //     headerName: 'Tên địa điểm',
  //     width: 200,
  //     editable: true
  //   },
  //   {
  //     field: 'typeLocation',
  //     headerName: 'Loại Hình Du lịch',
  //     width: 150,
  //     editable: true
  //   },
  //   {
  //     field: 'image',
  //     headerName: 'Hình ảnh',
  //     width: 150,
  //     editable: true,
  //     renderCell: params => (
  //       <img style={{ maxWidth: '100%' }} src={params.value} alt={params} />
  //     )
  //   },
  //   {
  //     field: 'description',
  //     headerName: 'Mô tả địa điểm',
  //     width: 300,
  //     editable: true
  //   },
  //   {
  //     field: 'locationLink',
  //     headerName: 'Địa chỉ trên google map',
  //     width: 250,
  //     editable: true
  //   },
  //   {
  //     field: 'locationName',
  //     headerName: 'Địa chỉ',
  //     width: 350,
  //     editable: true
  //   },
  //   {
  //     field: 'location',
  //     headerName: 'Tọa độ',
  //     type: 'string',
  //     width: 200,
  //     editable: true,
  //     renderCell: params => (
  //       <div style={{ display: 'flex', flexDirection: 'column' }}>
  //         <div>Kinh độ: {params.formattedValue?.lng}</div>
  //         <div>Vĩ độ: {params.formattedValue?.lat}</div>
  //       </div>
  //     )
  //   }
  // ]

  const [value, onChange] = useState('Giới thiệu về địa điểm')

  return (
    <DashBoard>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Tạo địa điểm du lịch
      </Typography>
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
            value={travels.locationName}
            type="text"
            label="Địa chỉ"
            onChange={e => updatedFormTravels({ locationName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
          <InputLabel>Mô tả về địa điểm: </InputLabel>
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
          {image && (
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
              src={image}
              alt={'test'}
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
        Tạo mới
      </Button>
      {/* {rows.length > 0 && (
        <Box sx={{ height: 800, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={15}
            rowsPerPageOptions={[15]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      )} */}
    </DashBoard>
  )
}

export default CreateTravels
