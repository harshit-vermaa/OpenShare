import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import PostReview from "./Pages/PostReview/PostReview"
import Login from './Pages/Auth/Login/Login'
import Registration from './Pages/Auth/Registration/Registration'
import dotenv from "dotenv"

const App = () => {

  dotenv.config({ path: './config.env' })

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post-review' element={<PostReview />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App