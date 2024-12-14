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
    
    // console.log(amount.length)
    // if (amount.length === 0) {
    //     let temp : number[] = [];
    //     for (const index in items) {
    //         temp[index] = 0;
    //     }

    //     setAmount(temp);
    // }
    // console.log(amount)

    // const handlePlusAmount = async (index : number) => {
    //     let amount2 = amount;
    //     amount2[index]++;
    //     setAmount([...amount2]);
    // }

    // const handleMinusAmount = async (index : number) => {
    //     if (amount[index] !== 0) {
    //         let amount2 = amount;
    //         amount2[index]--;
    //         setAmount([...amount2]);
    //     }
    // }

    // Calculate subtotal by summing up all item prices
    // const subtotal = filteredItems.reduce((total, item) => total + item.price, 0);

    // const handlePlusTotal = async (index : number) => {
    //     subtotal += filteredItems[index].price;
    //     onSubtotalChange(subtotal);
    // }

    // const handleMinusTotal = async (index : number) => {
    //     if (subtotal !== 0) {
    //         subtotal -= filteredItems[index].price;
    //         onSubtotalChange(subtotal);
    //     }
    // }
        
    // // Notify parent about the subtotal when it changes
    // useEffect(() => {
    //     onSubtotalChange(subtotal);
    // });

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
                        // onAddItemClick={() => {
                        //     handlePlusTotal(index);
                        //     handlePlusAmount(index);    
                        // }} 
                        // onMinusItemClick={() => {
                        //     handleMinusTotal(index);
                        //     handleMinusAmount(index);    
                        // }} 
                        onHeartClick={() => {}} 
                    />
                ))}
            </div>
            <div className="shopping-cart-text">Subtotal: ${subtotal.toFixed(2)}</div>
        </div>
    )
}

export default ShoppingCartList