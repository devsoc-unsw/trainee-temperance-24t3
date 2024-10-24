// import './App.css'
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
