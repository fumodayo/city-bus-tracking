import React, { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFormatInfo } from 'hooks/useFormatInfo'
import DashBoard from '../DashBoard'
import { Send } from '@mui/icons-material'
import { Modal } from 'antd'
import danabus from 'danabus'

export default function CreateInfoBusRoute() {
  const infos = useFormatInfo()
  const [toggleChangeInput, setToggleChangeInput] = useState(true)

  const handleChangeInput = () => {
    setToggleChangeInput(false)
  }

  const formik = useFormik({
    initialValues: {
      busCapacity: infos.busCapacity,
      busName: infos.busName,
      busOperation: infos.busOperation,
      busTicketOneWay: infos.busTicketOneWay,
      busTicketOrdinary: infos.busTicketOrdinary,
      busTicketPrioritized: infos.busTicketPrioritized
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      busCapacity: Yup.string()
        .min(5, 'Không được ít hơn 5 kí tự!')
        .max(120, 'Không được dài quá 120 kí tự!')
        .required('Không được để trống!'),
      busName: Yup.string()
        .min(5, 'Không được ít hơn 5 kí tự!')
        .max(120, 'Không được dài quá 120 kí tự!')
        .required('Không được để trống!'),
      busOperation: Yup.string()
        .min(5, 'Không được ít hơn 5 kí tự!')
        .max(120, 'Không được dài quá 120 kí tự!')
        .required('Không được để trống!'),
      busTicketOneWay: Yup.string()
        .min(5, 'Không được ít hơn 5 kí tự!')
        .max(120, 'Không được dài quá 120 kí tự!')
        .required('Không được để trống!'),
      busTicketOrdinary: Yup.string()
        .min(5, 'Không được ít hơn 5 kí tự!')
        .max(120, 'Không được dài quá 120 kí tự!')
        .required('Không được để trống!'),
      busTicketPrioritized: Yup.string()
        .min(5, 'Không được ít hơn 5 kí tự!')
        .max(120, 'Không được dài quá 120 kí tự!')
        .required('Không được để trống!')
    })
  })

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = () => {
    setShowModal(true)
  }

  return (
    <DashBoard>
      <Modal
        title="Bạn có chắc với hành động này?"
        open={showModal}
        okText="Thêm mới"
        cancelText="Hủy"
        onCancel={() => setShowModal(false)}
        onOk={async () => {
          await danabus.updatedInformationBusRoute(infos.id, formik.values)
          setShowModal(false)
        }}
      />
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Thông tin chung của tuyến xe buýt
      </Typography>
      {infos && (
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Sức chứa của xe:
              </Typography>
              {toggleChangeInput ? (
                <Typography onDoubleClick={handleChangeInput}>
                  {infos.busCapacity}
                </Typography>
              ) : (
                <TextField
                  id="busCapacity"
                  name="busCapacity"
                  type="text"
                  autoFocus
                  style={{ width: 300 }}
                  value={formik.values.busCapacity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.busCapacity ||
                    Boolean(formik.errors.busCapacity)
                  }
                  helperText={formik.errors.busCapacity}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Tên hãng xe:
              </Typography>
              {toggleChangeInput ? (
                <Typography onDoubleClick={handleChangeInput}>
                  {infos.busName}
                </Typography>
              ) : (
                <TextField
                  id="busName"
                  name="busName"
                  type="text"
                  style={{ width: 300 }}
                  value={formik.values.busName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.busName || Boolean(formik.errors.busName)
                  }
                  helperText={formik.errors.busName}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Đơn vị vận hành:
              </Typography>
              {toggleChangeInput ? (
                <Typography onDoubleClick={handleChangeInput}>
                  {infos.busOperation}
                </Typography>
              ) : (
                <TextField
                  id="busOperation"
                  name="busOperation"
                  type="text"
                  style={{ width: 300 }}
                  value={formik.values.busOperation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.busOperation ||
                    Boolean(formik.errors.busOperation)
                  }
                  helperText={formik.errors.busOperation}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Giá vé theo luợt:
              </Typography>
              {toggleChangeInput ? (
                <Typography onDoubleClick={handleChangeInput}>
                  {infos.busTicketOneWay}
                </Typography>
              ) : (
                <TextField
                  id="busTicketOneWay"
                  name="busTicketOneWay"
                  type="text"
                  style={{ width: 300 }}
                  value={formik.values.busTicketOneWay}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.busTicketOneWay ||
                    Boolean(formik.errors.busTicketOneWay)
                  }
                  helperText={formik.errors.busTicketOneWay}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Giá vé theo tháng (thường):
              </Typography>
              {toggleChangeInput ? (
                <Typography onDoubleClick={handleChangeInput}>
                  {infos.busTicketOrdinary}
                </Typography>
              ) : (
                <TextField
                  id="busTicketOrdinary"
                  name="busTicketOrdinary"
                  type="text"
                  style={{ width: 300 }}
                  value={formik.values.busTicketOrdinary}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.busTicketOrdinary ||
                    Boolean(formik.errors.busTicketOrdinary)
                  }
                  helperText={formik.errors.busTicketOrdinary}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Giá vé theo tháng (ưu tiên):
              </Typography>
              {toggleChangeInput ? (
                <Typography onDoubleClick={handleChangeInput}>
                  {infos.busTicketPrioritized}
                </Typography>
              ) : (
                <TextField
                  id="busTicketPrioritized"
                  name="busTicketPrioritized"
                  type="text"
                  style={{ width: 300 }}
                  value={formik.values.busTicketPrioritized}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.busTicketPrioritized ||
                    Boolean(formik.errors.busTicketPrioritized)
                  }
                  helperText={formik.errors.busTicketPrioritized}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      <Box sx={{ paddingTop: '20px' }}>
        <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
          xác nhận
        </Button>
      </Box>
    </DashBoard>
  )
}
