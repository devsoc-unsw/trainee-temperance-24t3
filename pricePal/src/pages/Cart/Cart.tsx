import React, { useState } from 'react';
import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';
import Header from "../../components/Header/Header";
import './Cart.css'

const Cart = () => {
    const [colesSubtotal, setColesSubtotal] = useState(0);
    const [wooliesSubtotal, setWooliesSubtotal] = useState(0);

    // Calculate total by adding the two subtotals
    const total = colesSubtotal + wooliesSubtotal;

    return(
        <>
            <Header />
            <div className='shopping-cart-flex'>
                {/* <div> Shopping Cart </div> */}
                <div className="shopping-cart-box">
                    <div className="shopping-cart-header">
                        <text className="shopping-cart-title">Shopping Cart</text>
                    </div>

                    <div className="shopping-cart-body">
                        <ShoppingCartList headerType='coles-header' matchShop='coles' shop='Coles' subtotal={colesSubtotal} onSubtotalChange={(subtotal: number) => setColesSubtotal(subtotal)}></ShoppingCartList>
                        {/* <div className="cart-divider"></div> */}
                        <ShoppingCartList headerType='woolies-header' matchShop='woolies' shop="Woolsworth" subtotal={wooliesSubtotal} onSubtotalChange={(subtotal) => setWooliesSubtotal(subtotal)}></ShoppingCartList>
                    </div>
                    <div className="shopping-cart-total">Total: ${total.toFixed(2)}</div>
                </div>
            </div>
        </>
    )
}


export default Cart;