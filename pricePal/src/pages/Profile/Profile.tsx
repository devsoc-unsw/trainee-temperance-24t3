import './Profile.css';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import PersonalInformation from "../../components/PersonalInformation/PersonalInformation";
import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react';

const supabase = createClient('https://wfqmymitwnqxlgoasfvr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcW15bWl0d25xeGxnb2FzZnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mzk5ODEsImV4cCI6MjA0OTMxNTk4MX0.R13p7WtvgaATKDXvEIrchGUp2FqBqRpI01jIv-tO5II')

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert("idk what happened but it errored");
  }
}

  const {data : {user}} = await supabase.auth.getUser();


const Profile = () => {

  return(
    <div className="profile-flex">
      <div> Profile Page</div>
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
  )
}

export default Profile;
