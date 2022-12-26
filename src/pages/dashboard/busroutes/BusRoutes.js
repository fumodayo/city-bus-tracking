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
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTimeBusStart } from 'hooks/useTimeBusStart'
import HTMLReactParser from 'html-react-parser'
import moment from 'moment'

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
        <TableCell align="left">{row.codeBusRoute}</TableCell>
        <TableCell align="left">{row.nameRoute}</TableCell>
        <TableCell align="left">{row.directionRoute}</TableCell>
        <TableCell align="left">
          {HTMLReactParser(row.drivingJourney)}
        </TableCell>
        <TableCell align="left">{row.lineDistance}</TableCell>
        <TableCell align="left">{row.operatingTime}</TableCell>
        <TableCell align="left">{row.colorRoute}</TableCell>
        <TableCell align="left">
          {moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS')}
        </TableCell>
        <TableCell align="left">
          <Link to={'/busroute/' + row.id}>
            <Button>Chỉnh sửa</Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
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
                      <TableCell align="left">Tên bến xe buýt</TableCell>
                      <TableCell align="left">Kinh độ</TableCell>
                      <TableCell align="left">Vỹ độ</TableCell>
                      <TableCell align="left">
                        Thời gian di chuyển giữa 2 bến
                      </TableCell>
                      <TableCell>Địa điểm du lịch ở gần trạm</TableCell>
                      <TableCell align="left">Thời gian tạo</TableCell>
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
                          <TableCell align="left">
                            {busStops.nameBusStop}
                          </TableCell>
                          <TableCell align="left">
                            {busStops.location.lng}
                          </TableCell>
                          <TableCell align="left">
                            {busStops.location.lat}
                          </TableCell>
                          <TableCell align="left">
                            {busStops.travelTime} phút
                          </TableCell>
                          <TableCell align="left">
                            {busStops.travelNear}
                          </TableCell>
                          <TableCell align="left">
                            {moment(busStops.createdAt).format(
                              'YYYY-MM-DD HH:MM:SS'
                            )}
                          </TableCell>
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
                      ?.startingTime.map((time, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">{time}</TableCell>
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
              <TableCell align="left" />
              <TableCell align="left">Mã số tuyến</TableCell>
              <TableCell align="left">Tên tuyến</TableCell>
              <TableCell align="left">Chiều của tuyến</TableCell>
              <TableCell align="left">Mô tả hành trình</TableCell>
              <TableCell align="left">Độ dài của tuyến</TableCell>
              <TableCell align="left">Thời gian tuyến hoạt động</TableCell>
              <TableCell align="left">Màu của tuyến</TableCell>
              <TableCell align="left">Thời gian tạo</TableCell>
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
        Tạo tuyến xe buýt
      </Button>
    </>
  )
}

export default BusRoutes
