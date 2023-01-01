import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material'
import { useTravel } from 'hooks/useTravel'
import { useParams } from 'react-router-dom'
import Resizer from 'react-image-file-resizer'
import { Send } from '@mui/icons-material'
import DashBoard from '../DashBoard'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditTravels = () => {
  let { travelId } = useParams()
  const dataTravels = useTravel()
  const [travels, setTravels] = useState([])

  const [toggleChangeInput, setToggleChangeInput] = useState(true)

  const handleChangeInput = () => {
    setToggleChangeInput(false)
  }

  const formik = useFormik({
    initialValues: {
      title: travels.title,
      locationName: travels.locationName,
      typeLocation: travels.typeLocation,
      locationLink: travels.locationLink,
      location: {
        lat: travels.location?.lat,
        lng: travels.location?.lng
      },
      description: travels.description
    },
    enableReinitialize: true,
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

  useEffect(() => {
    const findDataWithID = dataTravels.find(i => i.id === travelId)
    setTravels(findDataWithID)
  }, [travelId, dataTravels])

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

  const [newImage, setImage] = useState('')
  const convert2base64 = async e => {
    const file = e.target.files[0]
    const reader = await resizeFile(file)
    setImage(reader)
  }

  useEffect(() => {
    const data = {
      ...travels,
      image: newImage
    }
    setTravels(data)
  }, [newImage])

  // submit APIs
  const handleSubmit = () => {
    console.log({
      ...formik.values,
      image: newImage
    })
  }

  const switchTypeLocation = type => {
    switch (type) {
      case 'discover':
        type = 'Khám phá'
        break
      case 'cultural':
        type = 'Văn hóa'
        break
      case 'checking':
        type = 'Chụp ảnh'
        break
      case 'center':
        type = 'Trung tâm vui chơi'
        break
      case 'night':
        type = 'Vui chơi về đêm'
        break
      default:
        type = null
    }
    return type
  }

  return (
    <DashBoard>
      <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
        Chỉnh sửa địa điểm du lịch
      </Typography>
      <Box>
        {travels && (
          <Grid container spacing={2} columns={16}>
            <Grid
              item
              xs={8}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {travels.image && (
                <img
                  style={{
                    width: '300px',
                    height: '300px',
                    border: '3px solid #333333',
                    boxShadow:
                      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                  }}
                  src={travels.image}
                  alt={travels.image}
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ fontWeight: 'bold', width: 200 }}
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
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Tên địa điểm:
                </Typography>
                {toggleChangeInput ? (
                  <Typography onDoubleClick={handleChangeInput}>
                    {travels.title}
                  </Typography>
                ) : (
                  <TextField
                    id="title"
                    name="title"
                    type="text"
                    style={{ width: 300 }}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title || Boolean(formik.errors.title)}
                    helperText={formik.errors.title}
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>Địa chỉ:</Typography>
                {toggleChangeInput ? (
                  <Typography onDoubleClick={handleChangeInput}>
                    {travels.locationName}
                  </Typography>
                ) : (
                  <TextField
                    id="locationName"
                    name="locationName"
                    type="text"
                    style={{ width: 300 }}
                    value={formik.values.locationName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.locationName ||
                      Boolean(formik.errors.locationName)
                    }
                    helperText={formik.errors.locationName}
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Loại Hình Du lịch
                </Typography>
                {toggleChangeInput ? (
                  <Typography onDoubleClick={handleChangeInput}>
                    {travels?.typeLocation &&
                      switchTypeLocation(travels.typeLocation)}
                  </Typography>
                ) : (
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
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Địa chỉ trên google map
                </Typography>
                {toggleChangeInput ? (
                  <Typography
                    onDoubleClick={handleChangeInput}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {travels.locationLink}
                  </Typography>
                ) : (
                  <TextField
                    id="locationLink"
                    name="locationLink"
                    type="text"
                    value={formik.values.locationLink}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.locationLink ||
                      Boolean(formik.errors.locationLink)
                    }
                    helperText={formik.errors.locationLink}
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Mô tả về địa điểm:
                </Typography>
                {toggleChangeInput ? (
                  <Typography
                    onDoubleClick={handleChangeInput}
                    style={{
                      wordWrap: 'break-word'
                    }}
                  >
                    {travels.description}
                  </Typography>
                ) : (
                  <TextareaAutosize
                    id="description"
                    name="description"
                    type="text"
                    style={{ width: 500, height: 200 }}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description ||
                      Boolean(formik.errors.description)
                    }
                    helperText={formik.errors.description}
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Toạ độ địa điểm:
                </Typography>
                <Box>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Kinh độ:
                  </Typography>
                  {toggleChangeInput ? (
                    <Typography
                      onDoubleClick={handleChangeInput}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {travels.location?.lat}
                    </Typography>
                  ) : (
                    <TextField
                      id="location.lng"
                      name="location.lng"
                      type="number"
                      value={formik.values.location.lng}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.location?.lng ||
                        Boolean(formik.errors.location?.lng)
                      }
                      helperText={formik.errors.location?.lng}
                    />
                  )}
                  <Typography style={{ fontWeight: 'bold' }}>Vĩ độ:</Typography>
                  {toggleChangeInput ? (
                    <Typography
                      onDoubleClick={handleChangeInput}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {travels.location?.lng}
                    </Typography>
                  ) : (
                    <TextField
                      id="location.lat"
                      name="location.lat"
                      type="number"
                      value={formik.values.location.lat}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.location?.lat ||
                        Boolean(formik.errors.location?.lat)
                      }
                      helperText={formik.errors.location?.lat}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
        Chỉnh sửa
      </Button>
    </DashBoard>
  )
}

export default EditTravels
