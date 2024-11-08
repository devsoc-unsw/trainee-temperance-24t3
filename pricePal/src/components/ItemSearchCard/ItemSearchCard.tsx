import React, { MouseEventHandler } from "react";
import './ItemSearchCard.css'
import Heart from '../Heart/Heart.tsx';
import AddItemButton from '../AddItemButton/AddItemButton';

interface ItemSearchCardProps {
  itemName: string;
  itemImage: string;
  price: number;
  storeName: string;
  plusOrMinusSign: string;
  onHeartClick: MouseEventHandler;
  onAddItemClick: MouseEventHandler;
}

const ItemSearchCard = ({ itemName, itemImage, price, storeName, plusOrMinusSign, onHeartClick, onAddItemClick }: ItemSearchCardProps) => {

  return(
    <div className="item-card">
      {/* Header: itemName and heart */}
      <div className="item-header">
        <h1 className="item-name">{itemName}</h1>
        <Heart handler={onHeartClick}/>
      </div>

      {/* Item image */}
      <img className="item-image" src={itemImage} alt={itemName}/>

      {/* Footer: price and add button */}
      <div className="item-footer">
        <h1 className="price">{"$ " + price}</h1>
        <AddItemButton plusOrMinusSign={plusOrMinusSign} storeName={storeName} handler={onAddItemClick}/>
      </div>
    </div>
  )
}
export default ItemSearchCard