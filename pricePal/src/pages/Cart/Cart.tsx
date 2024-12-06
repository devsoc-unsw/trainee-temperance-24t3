import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';
import './Cart.css'

const Cart = () => {
    return(
        <div className='profile-flex'>
            <div> Shopping Cart </div>
            <div className="shopping-cart-box">
                <div className="account-header">
                    <text className="account-title">Shopping Cart</text>
                </div>

                <div className="shopping-cart-body">
                    <ShoppingCartList headerType='coles-header' shop='Coles'></ShoppingCartList>
                    {/* <div className="cart-divider"></div> */}
                    <ShoppingCartList headerType='woolies-header' shop="Woolsworth"></ShoppingCartList>
                </div>
                <div className="shopping-cart-text">Total</div>
            </div>
        </div>
    )
}


export default Cart;