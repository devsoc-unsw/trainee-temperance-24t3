import React from "react";
import './Home.css';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Heart from '../../components/Heart/Heart';
import AddItemButton from '../../components/AddItemButton/AddItemButton';
import ItemSearchCard from '../../components/ItemSearchCard/ItemSearchCard';

const Home = () => {
  const goToProfilePage = () => {
    console.log('going to profile page')
  }
  return(
    <>
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
