import React, { useState } from 'react'
import {
  Box,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'

const Test = () => {
  const formik = useFormik({
    initialValues: {
      codeBusRoute: ''
    },
    validationSchema: Yup.object({
      codeBusRoute: Yup.string()
        .min(3, 'Mã số tuyến xe buýt tối thiểu trên 3 kí tự!')
        .max(7, 'Mã số tuyến xe buýt không được dài quá 7 kí tự!')
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
        <TextField
          fullWidth
          id="codeBusRoute"
          name="codeBusRoute"
          label="codeBusRoute"
          value={formik.values.codeBusRoute}
          onChange={formik.handleChange}
          error={formik.touched.codeBusRoute && Boolean(formik.errors.codeBusRoute)}
          helperText={formik.touched.codeBusRoute && formik.errors.codeBusRoute}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Test
