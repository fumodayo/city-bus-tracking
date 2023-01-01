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
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CreateTravels = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      typeLocation: 'discover',
      image: '',
      imageDesc: '',
      description: '',
      locationLink: '',
      locationName: '',
      location: {
        lat: '',
        lng: ''
      }
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Tên địa điểm tối thiểu trên 5 kí tự!')
        .max(50, 'Tên địa điểm không được dài quá 50 kí tự!')
        .required('Phải điền tên địa điểm!'),
      typeLocation: Yup.string().required(),
      image: Yup.string().required(),
      imageDesc: Yup.string().max(100),
      description: Yup.string().max(1000, 'Mô tả không được dài quá!'),
      locationLink: Yup.string().max(
        255,
        'Địa chỉ không được dài quá 255 kí tự!'
      ),
      locationName: Yup.string().max(
        255,
        'Địa chỉ trên google map không được dài quá 255 kí tự!'
      ),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh độ tối thiểu trên 3 kí tự!')
          .max(12, 'Kinh độ không được dài quá 12 kí tự!')
          .required('Phải điền kinh độ địa điểm!'),
        lng: Yup.string()
          .min(3, 'Vĩ độ tối thiểu trên 3 kí tự!')
          .max(12, 'Vĩ độ không được dài quá 12 kí tự!')
          .required('Phải điền vĩ độ địa điểm!')
      })
    })
  })

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

  const [value, onChange] = useState('Giới thiệu về địa điểm')

  // submit APIs
  const handleSubmit = () => {
    console.log({
      ...formik.values,
      image: image,
      description: value
    })
  }

  return (
    <DashBoard>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Tạo địa điểm du lịch
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              id="title"
              name="title"
              type="text"
              label="Tên địa điểm"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title || Boolean(formik.errors.title)}
              helperText={formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 200 }}>
              <InputLabel>Loại Hình Du lịch</InputLabel>
              <Select
                id="typeLocation"
                name="typeLocation"
                value={formik.values.typeLocation}
                onChange={formik.handleChange}
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
              id="locationName"
              name="locationName"
              type="text"
              label="Địa chỉ"
              value={formik.values.locationName}
              onChange={formik.handleChange}
              error={
                formik.touched.locationName ||
                Boolean(formik.errors.locationName)
              }
              helperText={formik.errors.locationName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="locationLink"
              name="locationLink"
              type="text"
              label="Địa chỉ trên google map"
              value={formik.values.locationLink}
              onChange={formik.handleChange}
              error={
                formik.touched.locationLink ||
                Boolean(formik.errors.locationLink)
              }
              helperText={formik.errors.locationLink}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Toạ độ của địa điểm:</InputLabel>
            <TextField
              id="location.lng"
              name="location.lng"
              label="Kinh độ"
              type="number"
              value={formik.values.location.lng}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.lng ||
                Boolean(formik.errors.location?.lng)
              }
              helperText={formik.errors.location?.lng}
            />
            <TextField
              id="location.lat"
              name="location.lat"
              label="Vĩ độ"
              type="number"
              value={formik.values.location.lat}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.lat ||
                Boolean(formik.errors.location?.lat)
              }
              helperText={formik.errors.location?.lat}
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
                    boxShadow:
                      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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
        </Grid>
      </form>
      <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
        Tạo mới
      </Button>
    </DashBoard>
  )
}

export default CreateTravels
