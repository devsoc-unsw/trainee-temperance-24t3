import React, { useEffect, useState } from 'react';
import ShoppingCartCard from "../ShoppingCartCard/ShoppingCartCard";
import './ShoppingCartList.css'
interface ShoppingCartListProps {
    headerType: string,
    shop: string,
    subtotal: number,
    onSubtotalChange: (subtotal: number) => void;
}

const items = [
    { itemImage: "meat.png", price: 4.123, store: "Coles", itemName: "Coles White Bread"},
    { itemImage: "meat.png", price: 4.26, store: "Woolsworth", itemName: "Item 2" },
    { itemImage: "meat.png", price: 4.26, store: "Coles", itemName: "Item 3" },
    { itemImage: "fruits.png", price: 4.26, store: "Coles", itemName: "Item 2" },
    { itemImage: "meat.png", price: 4.26, store: "Woolsworth", itemName: "Item 3" },
    { itemImage: "meat.png", price: 4.26, store: "Coles", itemName: "Item 2" },
    { itemImage: "dairy.png", price: 4.26, store: "Woolsworth", itemName: "Item 3" }
];

const ShoppingCartList = ({headerType, shop, subtotal, onSubtotalChange} : ShoppingCartListProps) => {
    const [amount, setAmount] = useState<number[]>([]);
    
    console.log(amount.length)
    if (amount.length === 0) {
        let temp : number[] = [];
        for (const index in items) {
            temp[index] = 0;
        }

        setAmount(temp);
    }
    console.log(amount)

    const handlePlusAmount = async (index : number) => {
        let amount2 = amount;
        amount2[index]++;
        setAmount([...amount2]);
    }

    const handleMinusAmount = async (index : number) => {
        if (amount[index] !== 0) {
            let amount2 = amount;
            amount2[index]--;
            setAmount([...amount2]);
        }
    }

    // Filter items by matching store with the shop prop
    const filteredItems = items.filter(item => item.store === shop);

    // Calculate subtotal by summing up all item prices
    // const subtotal = filteredItems.reduce((total, item) => total + item.price, 0);

    const handlePlusTotal = async (index : number) => {
        subtotal += filteredItems[index].price;
        onSubtotalChange(subtotal);
    }

    const handleMinusTotal = async (index : number) => {
        if (subtotal !== 0) {
            subtotal -= filteredItems[index].price;
            onSubtotalChange(subtotal);
        }
    }
        
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
                        store={item.store}
                        amount={amount[index]}
                        itemName={item.itemName} 
                        onAddItemClick={() => {
                            handlePlusTotal(index);
                            handlePlusAmount(index);    
                        }} 
                        onMinusItemClick={() => {
                            handleMinusTotal(index);
                            handleMinusAmount(index);    
                        }} 
                        onHeartClick={() => {}} 
                    />
                ))}
            </div>
            <div className="shopping-cart-text">Subtotal: ${subtotal.toFixed(2)}</div>
        </div>
    )
}

export default ShoppingCartList