import React, { MouseEventHandler } from "react";
import './LandingPageCard.css'

interface LandingPageCardProps {
  itemName: string;
  itemImage: string;
}

const LandingPageCard = ({ itemName, itemImage }: LandingPageCardProps) => {

  return(
    <div className="landing-page-card">
      {/* Item name */}
      <p className="landing-page-name">{itemName}</p>

      {/* Item image */}
      <img className="landing-page-image" src={itemImage} alt={itemName}/>
    </div>
  )
}
export default LandingPageCard