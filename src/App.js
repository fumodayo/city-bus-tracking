import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import { createTheme, colors, ThemeProvider } from '@mui/material'
import './App.scss'
import EditTravels from 'pages/dashboard/travels/EditTravels'
import EditBusRoutes from 'pages/dashboard/busroutes/EditBusRoutes'
import Travels from 'pages/dashboard/travels/Travels'
import BusRoutes from 'pages/dashboard/busroutes/BusRoutes'
import MultiStepForm from 'pages/dashboard/busroutes/MultiStepForm'
import CreateTravels from 'pages/dashboard/travels/CreateTravels'
import Dashboard from 'pages/dashboard/DashBoard'
import CreateInfoBusRoute from 'pages/dashboard/infobusroute/CreateInfoBusRoute'
import Main from 'pages/dashboard/main/Main'
import Test from 'pages/dashboard/main/Test'

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
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />

        <Route path="/dashboard" element={<Main />} />
        {/* Travel */}
        <Route path="/dashboard/travels" element={<Travels />} />
        <Route path="/dashboard/travel/create" element={<CreateTravels />} />
        <Route path="/dashboard/travel/:travelId" element={<EditTravels />} />

        {/* Bus Routes, Bus Stop, Time Bus Start, Line Routes */}
        <Route path="/dashboard/busroutes" element={<BusRoutes />} />
        <Route path="/dashboard/busroute/create" element={<MultiStepForm />} />
        <Route
          path="/dashboard/busroute/:busrouteId"
          element={<EditBusRoutes />}
        />

        {/* Info Bus Route */}
        <Route
          path="/dashboard/infobusroute"
          element={<CreateInfoBusRoute />}
        />

        <Route path="/*" element={<NotFound />} />

        <Route path="/test" element={<Test />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
