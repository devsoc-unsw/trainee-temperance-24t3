import React, { useEffect, useState } from 'react';
import ShoppingCartCard from "../ShoppingCartCard/ShoppingCartCard";
import './ShoppingCartList.css'
import { useCart, CartItem } from '../../CartContext';

interface ShoppingCartListProps {
    headerType: string,
    matchShop: string,
    shop: string,
    subtotal: number,
    onSubtotalChange: (subtotal: number) => void;
}

const ShoppingCartList = ({headerType, matchShop, shop, subtotal, onSubtotalChange} : ShoppingCartListProps) => {
      const { cartItems, addItemToCart, removeItemFromCart } = useCart();
      const filteredItems: CartItem[] = cartItems.filter(item => item.storeName === matchShop);
      
      const [amount, setAmount] = useState<number[]>([]);

      useEffect(() => {
        const newSubtotal = filteredItems.reduce((total, item) => total + item.price * item.quantity, 0);
        onSubtotalChange(newSubtotal);
      }, [cartItems, shop, onSubtotalChange]);

      // Handle adding to cart (increase quantity)
      const handleAddItemClick = (itemName: string) => {
      const item = cartItems.find(item => item.itemName === itemName);
      if (item) {
        addItemToCart(item);
      }
    };

    // Handle removing from cart (decrease quantity)
    const handleMinusItemClick = (itemName: string) => {
    const item = cartItems.find(item => item.itemName === itemName);
    if (item && item.quantity > 1) {
      removeItemFromCart(item);
    } else {
      // If quantity is 1, remove the item completely
      removeItemFromCart(item);
    }
    };


    return(
        <div className="shopping-cart-list-body">
            <div className={headerType}>
                <text className="shop-header">{shop}</text>
            </div>
            <div className="shopping-list-grid">
                {filteredItems.map((item, index) => (
                    <ShoppingCartCard 
                        key={index} 
                        itemImage={item.itemImage} 
                        price={item.price} 
                        store={item.storeName}
                        amount={amount[index]}
                        itemName={item.itemName} 
                        onHeartClick={() => {}} 
                    />
                ))}
            </div>
            <div className="shopping-cart-text">Subtotal: ${subtotal.toFixed(2)}</div>
        </div>
    )
}

export default ShoppingCartList