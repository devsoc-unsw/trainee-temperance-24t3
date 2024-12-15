import './PersonalInformation.css';
import InfoBlock from "../InfoBlock/InfoBlock";

interface PersonalInformationProps {
    user: any;
}

const PersonalInformation = ({user} : PersonalInformationProps) => {
    
    return(
        <div className="personal-information">
            <text className="account-title">Personal Information</text>
            <text className="content">Manage your personal information, including phone, numbers and email address where you can be contacted.</text>

            <div className="personal-information-row">
                <InfoBlock title="Name" content={user.email.split('@')[0]} picture="pen.png"/>
                <InfoBlock title="Contact Number" content={user.DoB || "N/A"} picture="pen.png"/>
            </div>

            <div className="personal-information-row">
                <InfoBlock title="Country, Region" content={user.region || "N/A"} picture="pen.png"/>
                <InfoBlock title="Date of Birth" content={user.DoB || "N/A"} picture="pen.png"/>
            </div>


        </div>
    )
}

export default PersonalInformation