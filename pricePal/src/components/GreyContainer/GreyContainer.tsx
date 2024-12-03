import React from "react";
import './GreyContainer.css'


const GreyContainer = ({children}: {children: React.ReactNode}) => {

  return(
    <>
      <div className="grey-container">
        {children}
      </div>
    </>
  )
}
export default GreyContainer