import React from "react";
import './Home.css';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Header from "../../components/Header/Header";

const Home = () => {
  const goToProfilePage = () => {
    console.log('going to profile page')
  }
  return(
    <>
      <Header />
      <div> Home Page</div>
      <div className="home-main-container">
        <h1 className="">Bringing you low prices all day everyday</h1>
        <p>Let us do the work and help you find the best deals on you everyday grocery items</p>
        <PrimaryButton label={'SHOP NOW'} handler={goToProfilePage}/>
      </div>
    </>
  )
}

export default Home;
