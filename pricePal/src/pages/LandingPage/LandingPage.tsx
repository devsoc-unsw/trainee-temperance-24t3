import React, { MouseEventHandler } from "react";
import './LandingPage.css';
import ShopNowButton from "../../components/ShopNowButton/ShopNowButton";
import LandingPageCard from "../../components/LandingPageCard/LandingPageCard";

const LandingPage = () => {
  return(
    <div className="landing-page-flex">
      <div>
        Landing Page
      </div>
      
      <div className="landing-page-box">

        <div className="landing-page-header">
          <div className="landing-page-paragraph">
            <p id="landing-page-p1">Bringing you low<br/>prices all day<br/>everyday</p>
            <p id="landing-page-p2">Let us do the work and help you find the<br/>best deals on your everyday grocery items</p>
            <ShopNowButton/>
          </div>

          <img src={'paperBag.png'} className="landing-page-picture"/>
        </div>

        <div className="landing-page-footer">
          <div className="landing-page-footer-cards">
            <LandingPageCard itemName='Fruits' itemImage='fruits.png'/>
            <LandingPageCard itemName='Dairy' itemImage='dairy.png'/>
            <LandingPageCard itemName='Meat' itemImage='meat.png'/>
            <LandingPageCard itemName='Bakery' itemImage='bakery.png'/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LandingPage;
