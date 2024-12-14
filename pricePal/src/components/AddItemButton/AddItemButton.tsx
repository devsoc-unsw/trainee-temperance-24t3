import React, { MouseEventHandler } from "react";
import './AddItemButton.css'

interface AddItemButtonProps {
  storeName: string;
  plusOrMinusSign: string;
  width: number;
  height: number;
  handler: MouseEventHandler;
}

const getButtonClass = (storeName: string) => {
  if (storeName === 'woolies') {
    return 'green-button';
  } else if (storeName === 'coles') {
    return 'red-button';
  } else {
    return 'default-button';
  }
};

const AddItemButton = ({storeName, plusOrMinusSign, width, height, handler}: AddItemButtonProps) => {

  const buttonClass = getButtonClass(storeName);

  return(
    <>
      <button 
        className={`add-item-button ${buttonClass}`} 
        onClick={handler}
        style={{ width: `${width}px`, height: `${height}px`, fontSize:`${height-7}px`}}
      >
        {plusOrMinusSign}
      </button>  
    </>
  )
}
export default AddItemButton