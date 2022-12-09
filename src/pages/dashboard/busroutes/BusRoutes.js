import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTimeBusStart } from 'hooks/useTimeBusStart'
import HTMLReactParser from 'html-react-parser'

function Row(props) {
  const { row } = props
  const [open, setOpen] = useState(false)
  const [openBusRoute, setOpenBusRoute] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  const [codeRoute, setCodeRoute] = useState('')
  const [direction, setDirection] = useState('')
  const handleClick = () => {
    setCodeRoute(row.codeBusRoute)
    setDirection(row.directionRoute)
  }

  console.log(
    row.timeBusStart.filter(
      route =>
        route.codeBusRoute === codeRoute && route.directionRoute === direction
    )[0]?.startingTime
  )

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
        <TableCell>{HTMLReactParser(row.drivingJourney)}</TableCell>
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
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenBusRoute(!openBusRoute)}
                >
                  {openBusRoute ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Typography>
              {openBusRoute && (
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
              )}
            </Box>
          </Collapse>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Thời gian xe buýt chạy
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenTime(!openTime)}
                >
                  {openTime ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Typography>
              {openTime && (
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.timeBusStart
                      .filter(
                        route =>
                          route.codeBusRoute === codeRoute &&
                          route.directionRoute === direction
                      )[0]
                      ?.startingTime.map(busStops => (
                        <TableRow key={busStops.id}>
                          <TableCell align="center">{busStops}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const BusRoutes = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

  const busstops = useBusStop()
  const busroutes = useBusRoutes()
  const timeBusStart = useTimeBusStart()
  const rows = busroutes.map(route => ({
    ...route,
    busstops: busstops,
    timeBusStart: timeBusStart
  }))

  return (
    <>
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
      <Button onClick={() => navigate('/dashboard/createBusRoutes')}>
        Create BusRoutes
      </Button>
    </>
  )
}

export default BusRoutes
