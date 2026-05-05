import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signup from './Signup'
import Login from './Login'
import Technews from './Technews'
import Navigation from './Navigation'
import Events from './Events'
import Home from './Home'
import Homeelement from './Homeelement'
import Profile from './Profile'

function App() {

 const Tech = React.lazy(() => {
  console.log("⏳ Loading Technews chunk...");
  return import("./Technews");
});
  return (
    <>
      <div>
        <BrowserRouter>

          {/* Wrap the ROUTES (not the Route) */}
          <Suspense fallback={<p>Loading…</p>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/technews" element={<Tech />} />
              <Route path="/events" element={<Events />} />
              <Route path="/element" element={<Homeelement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/navi" element={<Navigation />} />
            </Routes>
          </Suspense>

        </BrowserRouter>
      </div>
    </>
  )
}

export default App
