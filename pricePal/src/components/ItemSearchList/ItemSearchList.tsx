import ItemSearchCard from "../ItemSearchCard/ItemSearchCard";
import './ItemSearchList.css'
interface ItemSearchListProps {
    headerType: string,
    shop: string
}

const ItemSearchList = ({headerType, shop} : ItemSearchListProps) => {
    return(
        <div className="search-list-body">
            <div className={headerType}>
                <text className="shop-header">{shop}</text>
            </div>
            <div className="search-list-grid">
                <ItemSearchCard storeName="woolies" plusOrMinusSign="+" itemImage="meat.png" price={4.1273} itemName="Coles White Bread"/>
                <ItemSearchCard storeName="woolies" plusOrMinusSign="+" itemImage="dairy.png" price={4.1273} itemName="Coles White Bread"/>
                <ItemSearchCard storeName="woolies" plusOrMinusSign="+" itemImage="fruits.png" price={4.1273} itemName="Coles White Bread"/>
            </div>
        </div>
    )
}

export default ItemSearchList