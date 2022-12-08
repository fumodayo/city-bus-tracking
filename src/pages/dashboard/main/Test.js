import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useBusStop } from 'hooks/useBusStop'
import { useBusRoutes } from 'hooks/useBusRoutes'
import { useState } from 'react'

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const [codeRoute, setCodeRoute] = useState('')
  const [direction, setDirection] = useState('')
  const handleClick = () => {
    setCodeRoute(row.codeBusRoute)
    setDirection(row.directionRoute)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell onClick={handleClick}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.codeBusRoute}</TableCell>
        <TableCell>{row.nameRoute}</TableCell>
        <TableCell>{row.directionRoute}</TableCell>
        <TableCell>{row.drivingJourney}</TableCell>
        <TableCell>{row.lineDistance}</TableCell>
        <TableCell>{row.operatingTime}</TableCell>
        <TableCell>{row.colorRoute}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Trạm xe buýt của tuyến
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên bến xe buýt</TableCell>
                    <TableCell>Kinh độ</TableCell>
                    <TableCell>Vỹ độ</TableCell>
                    <TableCell>Thời gian di chuyển giữa 2 bến</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.busstops
                    .filter(
                      route =>
                        route.codeBusRoute === codeRoute &&
                        route.directionRoute === direction
                    )
                    .map(busStops => (
                      <TableRow key={busStops.id}>
                        <TableCell component="th" scope="row">
                          {busStops.nameBusStop}
                        </TableCell>
                        <TableCell>{busStops.location.lng}</TableCell>
                        <TableCell>{busStops.location.lat}</TableCell>
                        <TableCell>{busStops.travelTime} phút</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const Test = () => {
  const busstops = useBusStop()
  const busroutes = useBusRoutes()
  const rows = busroutes.map(route => ({
    ...route,
    busstops: busstops
  }))

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Mã số tuyến</TableCell>
            <TableCell>Tên tuyến</TableCell>
            <TableCell>Chiều của tuyến</TableCell>
            <TableCell>Mô tả hành trình</TableCell>
            <TableCell>Độ dài của tuyến</TableCell>
            <TableCell>Thời gian tuyến hoạt động</TableCell>
            <TableCell>Màu của tuyến</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Test
