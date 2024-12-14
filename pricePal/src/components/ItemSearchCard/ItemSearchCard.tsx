import React, { MouseEventHandler } from "react";
import './ItemSearchCard.css';
import Heart from '../Heart/Heart.tsx';
import AddItemButton from '../AddItemButton/AddItemButton';

interface ItemSearchCardProps {
  itemName: string;
  itemImage: string;
  price: number;
  storeName: string;
  plusOrMinusSign: string;
  onHeartClick: MouseEventHandler;
  // onAddItemClick: MouseEventHandler;
}

const ItemSearchCard = ({ itemName, itemImage, price, storeName, plusOrMinusSign, onHeartClick }: ItemSearchCardProps) => {

  return(
    <div className="search-item-card">
      {/* Header: itemName and heart */}
      <div className="search-item-header">
        <h1 className="search-item-name">{itemName}</h1>
        <Heart handler={onHeartClick}/>
      </div>

      {/* Item image */}
      <div className="search-item-image-box">
        <img className="search-item-image" src={itemImage} alt={itemName}/>
      </div>

      {/* Footer: price and add button */}
      <div className="search-item-footer">
        <h1 className="search-item-price">{"$ " + price}</h1>
        <div className="add-minus-search-item">
          <AddItemButton 
            plusOrMinusSign={plusOrMinusSign} 
            storeName={storeName} 
            width={48}
            height={27}
            // handler={onAddItemClick}
          />
        </div>
      </div>
    </div>
  )
}
export default ItemSearchCard