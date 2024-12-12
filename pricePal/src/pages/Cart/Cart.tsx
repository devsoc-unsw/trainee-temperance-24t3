import React, { useState } from 'react';
import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';
import './Cart.css'

const Cart = () => {
    const [colesSubtotal, setColesSubtotal] = useState(0);
    const [wooliesSubtotal, setWooliesSubtotal] = useState(0);

    // Calculate total by adding the two subtotals
    const total = colesSubtotal + wooliesSubtotal;

    return(
        <div className='profile-flex'>
            <div> Shopping Cart </div>
            <div className="shopping-cart-box">
                <div className="account-header">
                    <text className="account-title">Shopping Cart</text>
                </div>

                <div className="shopping-cart-body">
                    <ShoppingCartList headerType='coles-header' shop='Coles' subtotal={colesSubtotal} onSubtotalChange={(subtotal: number) => setColesSubtotal(subtotal)}></ShoppingCartList>
                    {/* <div className="cart-divider"></div> */}
                    <ShoppingCartList headerType='woolies-header' shop="Woolsworth" subtotal={wooliesSubtotal} onSubtotalChange={(subtotal) => setWooliesSubtotal(subtotal)}></ShoppingCartList>
                </div>
                <div className="shopping-cart-text">Total: ${total.toFixed(2)}</div>
            </div>
        </div>
    )
}


export default Cart;