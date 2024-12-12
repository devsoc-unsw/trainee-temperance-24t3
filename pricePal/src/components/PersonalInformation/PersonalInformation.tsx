import './PersonalInformation.css';
import InfoBlock from "../InfoBlock/InfoBlock";

// joshua i need ur help
// idk how to do this without any T_T
interface PersonalInformationProps {
    user: any;
}

const PersonalInformation = ({user} : PersonalInformationProps) => {
    
    return(
        <div className="personal-information">
            <text className="account-title">Personal Information</text>
            <text className="content">Manage your personal information, including phone, numbers and email address where you can be contacted.</text>

            <div className="personal-information-row">
                <InfoBlock title="Name" content={user.email.split('@')[0]} picture="vite.svg"/>
                <InfoBlock title="Contact Number" content={user.DoB || "IDK"} picture="vite.svg"/>
            </div>

            <div className="personal-information-row">
                <InfoBlock title="Country, Region" content={user.region || "IDK"} picture="vite.svg"/>
                <InfoBlock title="Date of Birth" content={user.DoB || "IDK"} picture="vite.svg"/>
            </div>


        </div>
    )
}

export default PersonalInformation