import React, { MouseEventHandler, useState } from "react";
import './ShoppingCartCard.css'
import Heart from '../Heart/Heart.tsx';
import AddItemButton from '../AddItemButton/AddItemButton.tsx';

interface ShoppingCartCardProps {
  itemName: string;
  itemImage: string;
  price: number;
  onHeartClick: MouseEventHandler;
  onAddItemClick: MouseEventHandler;
}

const ShoppingCartCard = ({ itemName, itemImage, price, onHeartClick, onAddItemClick }: ShoppingCartCardProps) => {
  // To decriment and increment each amount of item in the shopping cart.
  const [amount, setAmount] = useState(0);
  const incrementAmount = () => setAmount(prevAmount => prevAmount + 1);
  const decrementAmount = () => setAmount(prevAmount => (prevAmount > 0 ? prevAmount - 1 : 0));

  const addMinusHeightWidth = {
    width: 38,
    height: 25
  }

  return(
    <div className="shopping-item-card">
      {/* Item image */}
      <img className="shopping-item-image" src={itemImage} alt={itemName}/>

      <div className="shopping-item-information">
        {/* Header: itemName and heart */}
        <div className="shopping-item-header">
          <h1 className="shopping-item-name">{itemName}</h1>
          <Heart handler={onHeartClick}/>
        </div>

        {/* Footer: price and add minus button */}
        <div className="shopping-item-footer">
          <div id="addRemoveItem">
            <AddItemButton 
              plusOrMinusSign="-" 
              storeName="" 
              width={addMinusHeightWidth.width} 
              height={addMinusHeightWidth.height} 
              handler={decrementAmount}
            />
            <h1 className="amount">{amount}</h1>
            <AddItemButton 
              plusOrMinusSign="+" 
              storeName="" 
              width={addMinusHeightWidth.width} 
              height={addMinusHeightWidth.height} 
              handler={incrementAmount}
            />
          </div>
          <h1 className="shopping-item-price">{"$ " + price}</h1>
        </div>
      </div>
    </div>
  )
}
export default ShoppingCartCard