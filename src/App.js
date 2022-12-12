import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import DashBoard from './pages/dashboard/DashBoard'
import { createTheme, colors, ThemeProvider } from '@mui/material'
import './App.scss'

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
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
