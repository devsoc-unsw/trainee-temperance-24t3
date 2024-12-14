import React, { useState } from "react";
import './Heart.css';

// DO I SAVE THE FAVORITES HERE IF THE HEART IS CLICKED? SO FOR 
// EVERY CARD I PASS THE ID OF THE ITEM TO THE HEART COMPONENT?

interface HeartProps {
  handler: () => {};
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