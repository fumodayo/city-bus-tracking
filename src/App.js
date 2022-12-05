import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import DashBoard from './pages/dashboard/DashBoard'
import './App.scss'

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard/*" element={<DashBoard />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  )
}

export default App
