import React, { useEffect, useState } from 'react'
import {
  Box,
  MenuItem,
  Select,
  Typography,
  FormControl,
  Button,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getTimeRange } from 'utilities/getTimeRange'
import { Send } from '@mui/icons-material'
import { Table } from 'react-bootstrap'

const CreateTimeBusStart = ({ dataBusRoutes }) => {
  const formik = useFormik({
    initialValues: {
      timerange: '15'
    },
    validationSchema: Yup.object({
      timerange: Yup.string().required()
    })
  })

  // create time bus start API
  const handleSubmit = () => {
    console.log({
      codeBusRoute: dataBusRoutes.codeBusRoute,
      directionRoute: dataBusRoutes.directionRoute,
      startingTime: tableTimeRange
    })
  }

  const [tableTimeRange, setTableTimeRange] = useState([])

  useEffect(() => {
    const timerange = getTimeRange(formik.values.timerange)
    setTableTimeRange(timerange)
  }, [formik.values.timerange])

  return (
    <Box>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Bước 3: Tạo thời gian xe buýt xuất bến
      </Typography>
      <Box sx={{ textAlign: 'left' }}>
        <Typography>
          Tuyến xe buýt thường hoạt động từ 6:00 sáng đến 19:00 tối cùng ngày
        </Typography>
        <Typography>
          Bạn cần nhập khoảng thời gian hai tuyến xe cách nhau chạy:
        </Typography>
        <FormControl required sx={{ m: 1, minWidth: 200 }}>
          <Select
            id="timerange"
            name="timerange"
            value={formik.values.timerange}
            onChange={formik.handleChange}
            error={formik.touched.timerange && Boolean(formik.errors.timerange)}
          >
            <MenuItem value={'5'}>5</MenuItem>
            <MenuItem value={'10'}>10</MenuItem>
            <MenuItem value={'15'}>15</MenuItem>
            <MenuItem value={'20'}>20</MenuItem>
            <MenuItem value={'25'}>25</MenuItem>
            <MenuItem value={'30'}>30</MenuItem>
          </Select>
        </FormControl>
        {tableTimeRange && (
          <>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Bảng mốc thời gian xe buýt xuất bến
            </Typography>
            <Box maxWidth={100}>
              <Table size="medium" aria-label="simple table">
                <TableBody>
                  <TableRow>
                    {tableTimeRange
                      .filter((t, index, arr) => index < arr.length / 2)
                      .map((time, idx) => (
                        <TableCell key={idx}>{time}</TableCell>
                      ))}
                  </TableRow>
                  <TableRow>
                    {tableTimeRange
                      .filter((t, index, arr) => index >= arr.length / 2)
                      .map((time, idx) => (
                        <TableCell key={idx}>{time}</TableCell>
                      ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </>
        )}
      </Box>
      <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
        Xác nhận
      </Button>
    </Box>
  )
}

export default CreateTimeBusStart
