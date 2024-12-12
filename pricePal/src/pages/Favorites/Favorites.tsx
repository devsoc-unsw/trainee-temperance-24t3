import FavoriteItemList from '../../components/FavoriteItemList/FavoriteItemList';
import Header from "../../components/Header/Header";
import './Favorites.css'

const Favorites = () => {
    return(
        <>
            <Header/>
            <div className='profile-flex'>
                {/* <div> Favorites page </div> */}
                <div className="favorite-item-box">
                    <div className="favorite-header">
                        <text className="account-title">Favorite Items</text>
                    </div>

                    <div className="favorite-item-body">
                        <FavoriteItemList headerType='coles-header' shop='Coles'></FavoriteItemList>
                        {/* <div className="cart-divider"></div> */}
                        <FavoriteItemList headerType='woolies-header' shop="Woolsworth"></FavoriteItemList>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Favorites;