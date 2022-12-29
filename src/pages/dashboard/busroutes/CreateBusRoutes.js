import React, { useState } from 'react'
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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'

const CreateBusRoutes = () => {
  const [textEdit, onChangeTextEdit] = useState(
    'Mô tả hành trình của tuyến xe buýt'
  )

  const codeBus = '23, 3423, 312321'

  const formik = useFormik({
    initialValues: {
      codeBusRoute: '',
      nameRoute: '',
      directionRoute: '',
      drivingJourney: '',
      lineDistance: '',
      operatingTime: '',
      colorRoute: '#000000'
    },
    validationSchema: Yup.object({
      codeBusRoute: Yup.string()
        .min(3, 'Mã số tuyến xe buýt tối thiểu trên 3 kí tự!')
        .max(7, 'Mã số tuyến xe buýt không được dài quá 7 kí tự!')
        .required('Phải điền mã số tuyến!'),
      nameRoute: Yup.string()
        .min(7, 'Tên tuyến xe buýt tối thiểu trên 7 kí tự!')
        .max(50, 'Tên tuyến xe buýt không được dài quá 50 kí tự!')
        .required('Phải điền tên tuyến xe buýt!'),
      directionRoute: Yup.string().required('Phải chọn chiều của tuyến xe!'),
      colorRoute: Yup.string().required('Phải chọn màu của tuyến xe!')
    }),
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <Box>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Bước 1: Tạo tuyến xe buýt
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
                formik.touched.codeBusRoute ||
                Boolean(formik.errors.codeBusRoute)
              }
              helperText={formik.errors.codeBusRoute}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="nameRoute"
              name="nameRoute"
              type="text"
              label="Mã số tuyến"
              value={formik.values.nameRoute}
              onChange={formik.handleChange}
              error={
                formik.touched.nameRoute || Boolean(formik.errors.nameRoute)
              }
              helperText={formik.errors.nameRoute}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Chiều của tuyến</InputLabel>
              <Select
                id="directionRoute"
                name="directionRoute"
                value={formik.values.directionRoute}
                onChange={formik.handleChange}
                error={
                  formik.touched.directionRoute &&
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
            <RichTextEditor
              style={{
                height: '300px',
                overflow: 'auto'
              }}
              id="rte"
              value={textEdit}
              onChange={onChangeTextEdit}
              formats={['bold', 'italic', 'underline']}
              controls={[['bold', 'italic', 'underline']]}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
            <FormControl variant="standard">
              <InputLabel>Độ dài của tuyến</InputLabel>
              <Input
                id="lineDistance"
                name="lineDistance"
                type="number"
                endAdornment={
                  <InputAdornment position="end">km</InputAdornment>
                }
                value={formik.values.lineDistance}
                onChange={formik.handleChange}
                error={
                  formik.touched.lineDistance &&
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
                formik.touched.operatingTime &&
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
                  formik.touched.colorRoute && Boolean(formik.errors.colorRoute)
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default CreateBusRoutes
