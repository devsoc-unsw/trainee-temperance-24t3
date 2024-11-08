import './PersonalInformation.css';
import InfoBlock from "../InfoBlock/InfoBlock";

const PersonalInformation = () => {
    
    return(
        <div className="personal-information">
            <text className="account-title">Personal Information</text>
            <text className="content">Manage your personal information, including phone, numbers and email address where you can be contacted.</text>

            <div className="personal-information-row">
                <InfoBlock title="Name" content="Jane Doe" picture="vite.svg"/>
                <InfoBlock title="Contact Number" content="(+61) 4 123 456 78" picture="vite.svg"/>
            </div>

            <div className="personal-information-row">
                <InfoBlock title="Country, Region" content="Australia, Kensington" picture="vite.svg"/>
                <InfoBlock title="Date of Birth" content="01 JAN 1999" picture="vite.svg"/>
            </div>


        </div>
    )
}

export default PersonalInformation