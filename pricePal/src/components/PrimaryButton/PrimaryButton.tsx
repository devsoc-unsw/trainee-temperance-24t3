import React from "react";
import './PrimaryButton.css'

interface PrimaryButtonProps {
  label: string;
  handler: MouseEventHandler;
}

const PrimaryButton = ({label, handler}: PrimaryButtonProps) => {

  return(
    <>
      <button className="primary-button" onClick={handler}>{label}</button>  
    </>
  )
}
export default PrimaryButton