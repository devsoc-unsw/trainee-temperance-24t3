import FavoriteItemCard from "../FavoriteItemCard/FavoriteItemCard";
import './FavoriteItemList.css'
interface FavoriteItemListProps {
    headerType: string,
    shop: string
}

const FavoriteItemList = ({headerType, shop} : FavoriteItemListProps) => {
    return(
        <div className="favorite-list-body">
            <div className={headerType}>
                <text className="shop-header">{shop}</text>
            </div>
            <div className="favorite-list-grid">
              <FavoriteItemCard itemImage="fruits.png" price={4.826} itemName="fjdsakfdjs sajnd skajdhska"/> 
              <FavoriteItemCard itemImage="meat.png" price={4.826} itemName="fjdsakfdjs sajnd skajdhska"/> 
              <FavoriteItemCard itemImage="dairy.png" price={4.826} itemName="fjdsakfdjs sajnd skajdhska"/> 
            </div>
        </div>
    )
}

export default FavoriteItemList