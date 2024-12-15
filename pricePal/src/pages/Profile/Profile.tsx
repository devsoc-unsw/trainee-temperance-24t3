import './Profile.css';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import PersonalInformation from "../../components/PersonalInformation/PersonalInformation"; 
import Header from "../../components/Header/Header";
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL || '', import.meta.env.VITE_SUPABASE_KEY || '');

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert("Sign out errored");
  }
}

  const {data : {user}} = await supabase.auth.getUser();


const Profile = () => {
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

  return(
    <>
      <Header/>
      <div className="profile-flex">
        {/* <div> Profile Page</div> */}
        <div className="account-box">

          <div className="account-header">
            <text className="account-title">My Account</text>
            <PrimaryButton label="Sign Out" handler={signOut}></PrimaryButton>
          </div>

          <hr/>

          <div className="account-body">
            {/* the user stuff bellow is really bad practice, ! basically tells typescript that the type will never be null */}
            <AccountSettings name={user!.email!.split('@')[0]} email={user!.email!} picture="image.png"></AccountSettings>
            <div className="vertical-line"></div>
            <PersonalInformation user={user!}/>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Profile;
