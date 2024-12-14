import React, { MouseEventHandler, useState } from "react";
import './ShoppingCartCard.css'
import Heart from '../Heart/Heart.tsx';
import AddItemButton from '../AddItemButton/AddItemButton.tsx';
import { useCart } from '../../CartContext';

interface ShoppingCartCardProps {
  itemName: string;
  itemImage: string;
  price: number;
  store: string;
  amount: number;
  onHeartClick: MouseEventHandler;
  // onAddItemClick: MouseEventHandler;
  // onMinusItemClick: MouseEventHandler;
}

const ShoppingCartCard = ({ itemName, itemImage, price, store, amount, onHeartClick }: ShoppingCartCardProps) => {
  // To decriment and increment each amount of item in the shopping cart.
  // const [amount, setAmount] = useState(0);
  // const incrementAmount = () => setAmount(prevAmount => prevAmount + 1);
  // const decrementAmount = () => setAmount(prevAmount => (prevAmount > 0 ? prevAmount - 1 : 0));

  const { cartItems, addItemToCart, removeItemFromCart } = useCart(); // Get the add and remove functions from the CartContext
  const itemInCart = cartItems.find(item => item.itemName === itemName);

  // Add item to cart when clicked
  const handleAddItemClick = () => {
    const item = { itemName, itemImage, price, storeName: store, quantity: 1 };
    addItemToCart(item); // Add the item to the cart
  };

  // Remove item from cart when clicked
  const handleMinusItemClick = () => {
    const item = { itemName, itemImage, price, storeName: store, quantity: 1 };
    removeItemFromCart(item); // Remove the item from the cart
  };

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
              handler={handleMinusItemClick} 
              // handler={(e) => {
              //     console.log("decriment");
              //     onMinusItemClick(e);
              //   }
              // }
            />
            <h1 className="amount">{itemInCart ? itemInCart.quantity : 0}</h1>
            <AddItemButton 
              plusOrMinusSign="+" 
              storeName="" 
              width={addMinusHeightWidth.width} 
              height={addMinusHeightWidth.height} 
              handler={handleAddItemClick}
              // handler={(e) => {
              //     console.log("increment");
              //     onAddItemClick(e);
              //   }
              // }
            />
          </div>
          <h1 className="shopping-item-price">{"$ " + price}</h1>
        </div>
      </div>
    </div>
  )
}
export default ShoppingCartCard