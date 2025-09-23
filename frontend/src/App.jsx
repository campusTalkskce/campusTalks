import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
