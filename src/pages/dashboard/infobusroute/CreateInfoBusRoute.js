import { DeleteForever, Done, Edit, Send } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Tooltip
} from '@mui/material'
import { useFormatInfo } from 'hooks/useFormatInfo'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import DashBoard from '../DashBoard'

const CustomTableCell = ({ row, name, onChange }) => {
  const { isEditMode } = row
  return (
    <TableCell align="left">
      {isEditMode ? (
        <Input value={row[name]} name={name} onChange={e => onChange(e, row)} />
      ) : (
        row[name]
      )}
    </TableCell>
  )
}

export default function CreateInfoBusRoute() {
  const infos = useFormatInfo()
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows([infos])
  }, [infos])

  const [previous, setPrevious] = useState({})

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }))
    }
    const value = e.target.value
    const name = e.target.name
    const { id } = row
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRows(newRows)
  }

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row
      }
      return row
    })
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })
    onToggleEditMode(id)
  }

  const onSubmit = () => {
    console.log(rows)
  }

  return (
    <DashBoard>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Thông tin chung của tuyến xe buýt
      </Typography>
      <Paper>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Hành động</TableCell>
              <TableCell align="left">Giá vé theo luợt</TableCell>
              <TableCell align="left">Giá vé theo tháng (ưu tiên)</TableCell>
              <TableCell align="left">Giá vé theo tháng (thường)</TableCell>
              <TableCell align="left">Đơn vị vận hàng</TableCell>
              <TableCell align="left">Tên hãng xe</TableCell>
              <TableCell align="left">Sức chứa của xe</TableCell>
              <TableCell align="left">Thời gian tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.isEditMode ? (
                    <>
                      <Tooltip title="Xác nhận">
                        <IconButton
                          aria-label="done"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <Done />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hủy bỏ">
                        <IconButton
                          aria-label="revert"
                          onClick={() => onRevert(row.id)}
                        >
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        aria-label="delete"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <CustomTableCell
                  {...{ row, name: 'busTicketOneWay', onChange }}
                />
                <CustomTableCell
                  {...{ row, name: 'busTicketPrioritized', onChange }}
                />
                <CustomTableCell
                  {...{ row, name: 'busTicketOrdinary', onChange }}
                />
                <CustomTableCell {...{ row, name: 'busOperation', onChange }} />
                <CustomTableCell {...{ row, name: 'busName', onChange }} />
                <CustomTableCell {...{ row, name: 'busCapacity', onChange }} />
                <TableCell>
                  {moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box sx={{ paddingTop: '20px' }}>
        <Button variant="contained" onClick={onSubmit} endIcon={<Send />}>
          xác nhận
        </Button>
      </Box>
    </DashBoard>
  )
}
