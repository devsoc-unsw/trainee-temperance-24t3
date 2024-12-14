import ItemSearchCard from "../ItemSearchCard/ItemSearchCard";
import './ItemSearchList.css'
interface ItemSearchListProps {
    headerType: string,
    shop: string,
    data: object[]
}

const ItemSearchList = ({headerType, shop, data} : ItemSearchListProps) => {
    // console.log("list");
    // console.log(data);
    return(
        <div className="search-list-body">
            <div className={headerType}>
                <text className="shop-header">{shop}</text>
            </div>
            <div className="search-list-grid">
                {
                    data.map((item: any, index) => (
                            <ItemSearchCard 
                            storeName= {shop}
                            plusOrMinusSign="+" 
                            itemImage="meat.png" 
                            price={item.price} 
                            itemName={item.name}
                            onHeartClick={() => {}} 
                            onAddItemClick={() => {}}
                        />
                    ))
                }

                <ItemSearchCard storeName="woolies" plusOrMinusSign="+" itemImage="meat.png" price={4.1273} itemName="Coles White Bread" onHeartClick={() => {}} onAddItemClick={() => {}}/>
                <ItemSearchCard storeName="woolies" plusOrMinusSign="+" itemImage="dairy.png" price={4.1273} itemName="Coles White Bread" onHeartClick={() => {}} onAddItemClick={() => {}}/>
                <ItemSearchCard storeName="woolies" plusOrMinusSign="+" itemImage="fruits.png" price={4.1273} itemName="Coles White Bread" onHeartClick={() => {}} onAddItemClick={() => {}}/>
            </div>
        </div>
    )
}

export default ItemSearchList