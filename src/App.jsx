import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Jobs from './components/Jobs'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Home} />} />
        <Route path="/jobs" element={<ProtectedRoute Component={Jobs} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App