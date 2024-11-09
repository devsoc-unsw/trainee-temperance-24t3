import React, { MouseEventHandler, useState } from "react";
import './FavoriteItemCard.css'
import Heart from '../Heart/Heart.tsx';
import AddItemButton from '../AddItemButton/AddItemButton.tsx';

interface FavoriteItemCardProps {
  itemName: string;
  itemImage: string;
  price: number;
  onHeartClick: MouseEventHandler;
  onAddItemClick: MouseEventHandler;
}

const FavoriteItemCard = ({ itemName, itemImage, price, onHeartClick, onAddItemClick }: FavoriteItemCardProps) => {

  const addItemToCart = {
    width: 500,
    height: 25
  }

  return(
    <div className="favorite-item-card">
      {/* Item image */}
      <img className="favorite-item-image" src={itemImage} alt={itemName}/>

      <div className="favorite-item-information">
        {/* Header: itemName and heart */}
        <div className="favorite-item-header">
          <h1 className="favorite-item-name">{itemName}</h1>
          <Heart handler={onHeartClick}/>
        </div>

        {/* Footer: price and add minus button */}
        <div className="favorite-item-footer">
          <div id="addItemToCart">
            <AddItemButton 
              plusOrMinusSign="Add to cart" 
              storeName="" 
              width={addItemToCart.width} 
              height={addItemToCart.height} 
              handler={onAddItemClick}
            />
          </div>
          <h1 className="favorite-item-price">{"$ " + price}</h1>
        </div>
      </div>
    </div>
  )
}
export default FavoriteItemCard