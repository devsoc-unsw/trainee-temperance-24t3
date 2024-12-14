// import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import LandingPage from "./pages/LandingPage/LandingPage";
import Favorites from "./pages/Favorites/Favorites";
import { useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || '', import.meta.env.VITE_SUPABASE_KEY || '');

function App() {

  // const [session, setSession] = useState<object | null>(null)
 
  //   useEffect(() => {
  //     supabase.auth.getSession().then(({ data: { session } }) => {
  //       setSession(session)
  //     })

  //     const {
  //       data: { subscription },
  //     } = supabase.auth.onAuthStateChange((_event, session) => {
  //       setSession(session)
  //     })

  //     return () => subscription.unsubscribe()
  //   }, [])

  //   if (!session) {
  //     return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  //   }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </>
  )
}

export default App
