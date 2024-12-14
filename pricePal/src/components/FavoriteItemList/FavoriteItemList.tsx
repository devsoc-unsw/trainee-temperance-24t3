import FavoriteItemCard from "../FavoriteItemCard/FavoriteItemCard";
import './FavoriteItemList.css'
interface FavoriteItemListProps {
    headerType: string,
    shop: string
}

const addToCart = async (index : number) => {
    // ADD THE ITEM TO THE CART
}

const items = [
    { itemImage: "meat.png", price: 4.123, store: "Coles", itemName: "91", id: 91},
    { itemImage: "meat.png", price: 4.26, store: "Woolsworth", itemName: "92", id: 92},
    { itemImage: "meat.png", price: 4.26, store: "Coles", itemName: "93", id: 93},
    { itemImage: "fruits.png", price: 4.26, store: "Coles", itemName: "94", id: 94},
    { itemImage: "meat.png", price: 4.26, store: "Woolsworth", itemName: "95", id: 95},
    { itemImage: "meat.png", price: 4.26, store: "Coles", itemName: "96", id: 96},
    { itemImage: "dairy.png", price: 4.26, store: "Woolsworth", itemName: "97", id: 97}
];

const inFavorites = [91, 92, 93, 94];

const FavoriteItemList = ({headerType, shop} : FavoriteItemListProps) => {
    const filteredFavorites = items.filter(item => inFavorites.find(match => match === item.id));
    const filteredStore = filteredFavorites.filter(item => item.store === shop);

    return(
        <div className="favorite-list-body">
            <div className={headerType}>
                <text className="shop-header">{shop}</text>
            </div>
            <div className="favorite-list-grid">
                {filteredStore.map((item, index) => (
                    <FavoriteItemCard 
                    itemImage={item.itemImage}
                    price={item.price} 
                    itemName={item.itemName}
                    onAddItemClick={() => {
                        addToCart(index);    
                    }} 
                    onHeartClick={() => {}}/> 
                ))}
            </div>
        </div>
    )
}

export default FavoriteItemList