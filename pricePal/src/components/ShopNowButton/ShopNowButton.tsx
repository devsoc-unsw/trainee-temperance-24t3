import React, { MouseEventHandler } from "react";
import {Link } from "react-router-dom";
import './ShopNowButton.css'

interface ShopNowButtonProps {
  handler: MouseEventHandler;
}

const ShopNowButton = ({handler}: ShopNowButtonProps) => {

  return(
    <>
      <Link to="/SearchPage">
        <button className="shop-now-button">SHOP NOW</button>  
      </Link>
    </>
  )
}
export default ShopNowButton