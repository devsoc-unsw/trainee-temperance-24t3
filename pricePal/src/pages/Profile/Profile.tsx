import './Profile.css';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import PersonalInformation from "../../components/PersonalInformation/PersonalInformation";

const Profile = () => {
  return(
    <div className="profile-flex">
      <div> Profile Page</div>
      <div className="account-box">

        <div className="account-header">
          <text className="account-title">My Account</text>
          <PrimaryButton label="Sign Out" handler={() =>{alert("Sign Out: TODO dont forget");}}></PrimaryButton>
        </div>

        <hr/>

        <div className="account-body">
          <AccountSettings name="Jane Doe" email="jane.doe@example.com" picture="image.png"></AccountSettings>
          <div className="vertical-line"></div>
          <PersonalInformation/>
        </div>
        
      </div>
    </div>
  )
}

export default Profile;
