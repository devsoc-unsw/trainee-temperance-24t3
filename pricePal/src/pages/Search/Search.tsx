import ItemSearchList from '../../components/ItemSearchList/ItemSearchList';
import './Search.css'

const Cart = () => {
    return(
        <div className='profile-flex'>
            <div> search page </div>
            <div className="item-search-box">
                <div className="item-search-header">
                    <text className="account-title">Showing search for "bwfgregewg"</text>
                </div>

                <div className="item-search-body">
                    <ItemSearchList headerType='coles-header' shop='Coles'></ItemSearchList>
                    {/* <div className="cart-divider"></div> */}
                    <ItemSearchList headerType='woolies-header' shop="Woolsworth"></ItemSearchList>
                </div>
            </div>
        </div>
    )
}


export default Cart;