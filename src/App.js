import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import DashBoard from './pages/dashboard/DashBoard'
import { createTheme, colors, ThemeProvider } from '@mui/material'
import './App.scss'
import EditTravels from 'pages/dashboard/travels/EditTravels'
import EditBusRoutes from 'pages/dashboard/busroutes/EditBusRoutes'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue[500]
    },
    secondary: {
      main: colors.green[500]
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
        <Route path="/travel/:travelId" element={<EditTravels />} />
        <Route path="/404" element={<NotFound />} />
        {/* <Route path="/busroutes/:busrouteId" element={<ListBusStopInRoute />} /> */}
        <Route path='/busroute/:busrouteId' element={<EditBusRoutes/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
