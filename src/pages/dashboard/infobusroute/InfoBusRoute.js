import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useFormatInfo } from 'hooks/useFormatInfo'

const InfoBusRoute = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

  const rows = useFormatInfo()

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Giá vé theo luợt</TableCell>
              <TableCell>Giá vé theo tháng (ưu tiên)</TableCell>
              <TableCell>Giá vé theo tháng (thường)</TableCell>
              <TableCell>Đơn vị vận hàng</TableCell>
              <TableCell>Tên hãng xe</TableCell>
              <TableCell>Sức chứa của xe</TableCell>
            </TableRow>
          </TableHead>
          {rows.ticketPrice && (
            <TableBody>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{rows?.ticketPrice[0]}</TableCell>
                <TableCell>{rows?.ticketPrice[1]}</TableCell>
                <TableCell>{rows?.ticketPrice[2]}</TableCell>
                <TableCell>{rows.busOperation}</TableCell>
                <TableCell>{rows.busName}</TableCell>
                <TableCell>{rows.busCapacity}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Button onClick={() => navigate('/dashboard/createInfoBusRoute')}>
        Create InfoBusRoute
      </Button>
    </>
  )
}

export default InfoBusRoute
