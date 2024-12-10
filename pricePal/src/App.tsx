// import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const supabase = createClient('https://wfqmymitwnqxlgoasfvr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcW15bWl0d25xeGxnb2FzZnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mzk5ODEsImV4cCI6MjA0OTMxNTk4MX0.R13p7WtvgaATKDXvEIrchGUp2FqBqRpI01jIv-tO5II')

function App() {

  const [session, setSession] = useState<object | null>(null)
 
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }

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
