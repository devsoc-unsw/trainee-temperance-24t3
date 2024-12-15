// import './App.css'
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import LandingPage from "./pages/LandingPage/LandingPage";
import Favorites from "./pages/Favorites/Favorites";
import { useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'


function App() {

  

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </>
  )
}

export default App
