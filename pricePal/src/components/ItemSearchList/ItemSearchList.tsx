import ItemSearchCard from "../ItemSearchCard/ItemSearchCard";
import './ItemSearchList.css'
interface ItemSearchListProps {
    headerType: string,
    shop: string,
    data: object[]
}

const items = [
    { itemImage: "meat.png", price: 4.123, store: "Coles", itemName: "Coles White Bread"},
    { itemImage: "meat.png", price: 4.26, store: "Woolsworth", itemName: "Item 21" },
    { itemImage: "meat.png", price: 4.26, store: "Coles", itemName: "Item 32" },
    { itemImage: "fruits.png", price: 4.26, store: "Coles", itemName: "Item 23" },
    { itemImage: "meat.png", price: 4.26, store: "Woolsworth", itemName: "Item 34" },
    { itemImage: "meat.png", price: 4.26, store: "Coles", itemName: "Item 25" },
    { itemImage: "dairy.png", price: 4.26, store: "Woolsworth", itemName: "Item 36" }
];

const ItemSearchList = ({headerType, shop, data} : ItemSearchListProps) => {
    // console.log("list");
    // console.log(data);

    const filteredStore = items.filter(item => item.store === shop);

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

                {filteredStore.map((item, index) => (
                    <ItemSearchCard 
                    storeName={item.store}
                    price={item.price} 
                    itemImage={item.itemImage}
                    itemName={item.itemName}
                    plusOrMinusSign="+"
                    onHeartClick={() => {}}
                    onAddItemClick={() => {}}
                    />
                ))}
            </div>
        </div>
    )
}

export default ItemSearchList