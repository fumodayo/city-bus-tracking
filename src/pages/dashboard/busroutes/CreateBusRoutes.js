import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import danabus from 'danabus'
import { Modal } from 'antd'

const CreateBusRoutes = ({ setDataBusRoutes }) => {
  const formik = useFormik({
    initialValues: {
      codeBusRoute: '',
      nameRoute: '',
      directionRoute: 'turn',
      drivingJourney: '',
      lineDistance: '',
      operatingTime: '',
      colorRoute: '#000000'
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      codeBusRoute: Yup.string()
        .min(3, 'Mã số tuyến xe buýt tối thiểu trên 3 kí tự!')
        .max(7, 'Mã số tuyến xe buýt không được dài quá 7 kí tự!')
        .required('Phải điền mã số tuyến!'),
      nameRoute: Yup.string()
        .min(7, 'Tên tuyến xe buýt tối thiểu trên 7 kí tự!')
        .max(50, 'Tên tuyến xe buýt không được dài quá 50 kí tự!')
        .required('Phải điền tên tuyến xe buýt!'),
      directionRoute: Yup.string(),
      drivingJourney: Yup.string().max(1000, 'Mô tả không được dài quá!'),
      lineDistance: Yup.string().max(
        10,
        'Chiều dài tuyến đường không được dài quá 10 kí tự!'
      ),
      operatingTime: Yup.string().max(
        20,
        'Thời gian tuyến hoạt động không được dài quá 20 kí tự!'
      ),
      colorRoute: Yup.string()
    })
  })

  const handleSubmit = async () => {
    setDataBusRoutes(formik.values)
    setShowModal(true)
  }

  const [showModal, setShowModal] = useState(false)

  return (
    <Box>
      <Modal
        title="Bạn có chắc với hành động này?"
        open={showModal}
        okText="Thêm mới"
        cancelText="Hủy"
        onCancel={() => setShowModal(false)}
        onOk={async () => {
          await danabus.createBusRoute(formik.values)
          setShowModal(false)
        }}
      />
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Bước 1: Tạo tuyến xe buýt
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            id="codeBusRoute"
            name="codeBusRoute"
            type="text"
            label="Mã số tuyến"
            value={formik.values.codeBusRoute}
            onChange={formik.handleChange}
            error={
              formik.touched.codeBusRoute || Boolean(formik.errors.codeBusRoute)
            }
            helperText={formik.errors.codeBusRoute}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nameRoute"
            name="nameRoute"
            type="text"
            label="Tên tuyến xe buýt"
            value={formik.values.nameRoute}
            onChange={formik.handleChange}
            error={formik.touched.nameRoute || Boolean(formik.errors.nameRoute)}
            helperText={formik.errors.nameRoute}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ minWidth: 200 }}>
            <InputLabel>Chiều của tuyến</InputLabel>
            <Select
              id="directionRoute"
              name="directionRoute"
              value={formik.values.directionRoute}
              onChange={formik.handleChange}
              error={
                formik.touched.directionRoute ||
                Boolean(formik.errors.directionRoute)
              }
            >
              <MenuItem value={'turn'}>Chiều đi</MenuItem>
              <MenuItem value={'return'}>Chiều về</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Mô tả hành trình</InputLabel>
          <TextareaAutosize
            style={{ minWidth: 500, minHeight: 200 }}
            id="drivingJourney"
            name="drivingJourney"
            type="text"
            value={formik.values.drivingJourney}
            onChange={formik.handleChange}
            error={
              formik.touched.drivingJourney ||
              Boolean(formik.errors.drivingJourney)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
          <FormControl variant="standard">
            <InputLabel>Độ dài của tuyến</InputLabel>
            <Input
              id="lineDistance"
              name="lineDistance"
              type="number"
              endAdornment={<InputAdornment position="end">km</InputAdornment>}
              value={formik.values.lineDistance}
              onChange={formik.handleChange}
              error={
                formik.touched.lineDistance ||
                Boolean(formik.errors.lineDistance)
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="operatingTime"
            type="text"
            label="Thời gian tuyến hoạt động"
            name="operatingTime"
            value={formik.values.operatingTime}
            onChange={formik.handleChange}
            error={
              formik.touched.operatingTime ||
              Boolean(formik.errors.operatingTime)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <TextField
              id="colorRoute"
              name="colorRoute"
              value={formik.values.colorRoute}
              onChange={formik.handleChange}
              type="color"
              label="Màu của tuyến"
              error={
                formik.touched.colorRoute || Boolean(formik.errors.colorRoute)
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box style={{ margin: '20px 0 20px 0' }}>
        <Typography
          style={{ fontWeight: 'bold', color: 'red', marginBottom: '10px' }}
        >
          Vui lòng "Tạo mới" trước khi đến các bước tiếp theo!
        </Typography>
        <Button
          onClick={handleSubmit}
          variant="contained"
          type="submit"
          color="warning"
        >
          Tạo mới
        </Button>
      </Box>
    </Box>
  )
}

export default CreateBusRoutes
