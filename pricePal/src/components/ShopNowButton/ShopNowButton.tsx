import React, { MouseEventHandler } from "react";
import {Link } from "react-router-dom";
import './ShopNowButton.css'

const ShopNowButton = () => {

  return(
    <>
      <Link to="/SearchPage">
        <button className="shop-now-button">SHOP NOW</button>  
      </Link>
    </>
  )
}
export default ShopNowButton