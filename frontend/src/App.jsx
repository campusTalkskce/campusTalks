import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './Navigation'
import Technews from './Technews'
import Events from './Events'
import Home from './Home'


function App() {

  return (
    <>
    <div>

    
      <BrowserRouter>
      
     
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/technews" element={<Technews />}></Route>
        <Route path="/events" element={<Events />}></Route>
        
        <Route path="/navi" element={<Navigation />}></Route>

        
      </Routes>
      
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
