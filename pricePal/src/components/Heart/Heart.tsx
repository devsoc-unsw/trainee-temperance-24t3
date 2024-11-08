import React, { useState } from "react";
import './Heart.css'

interface HeartProps {
  handler: MouseEventHandler;
}

const Heart = ({handler}: HeartProps) => {
  // Set state of heart to either hearted or unhearted.
  const [isHearted, setIsHearted] = useState(false);

  // Function to toggle the heart.
  const toggleHeart = () => {
    setIsHearted(!isHearted);
    handler();
  }

  return(
    <>
      <button className="heart" onClick={toggleHeart}>
        <img 
          className="heart-image"
          src={isHearted ? 'hearted.png' : 'unhearted.png'} 
          alt={isHearted ? 'Hearted' : 'Unhearted'} 
        />
      </button>
    </>
  )
}
export default Heart