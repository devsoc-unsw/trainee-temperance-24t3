// import './App.css'
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/landingPage" element={<LandingPage/>} />
      </Routes>
    </>
  )
}

export default App
