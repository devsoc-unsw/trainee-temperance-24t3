import './accountSettings.css';

interface accountSettingsProps {
    name: string;
    email: string;
    picture: string;
}

const AccountSettings = ({name, email, picture}: accountSettingsProps) => {
    return(
        <div className="account-settings">
        <img id="profile-circle" src={picture}/>
        <text className="title">{name}</text>
        <text className="content">{email}</text>
        </div>
    )
}

export default AccountSettings