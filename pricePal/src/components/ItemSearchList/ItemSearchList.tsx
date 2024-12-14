import ItemSearchCard from "../ItemSearchCard/ItemSearchCard";
import './ItemSearchList.css'
interface ItemSearchListProps {
    headerType: string,
    shop: string,
    data: any[]
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

    const filteredItems = data.filter(item => item.store === shop);

    return(
        <div className="search-list-body">
            <div className={headerType}>
                <text className="shop-header">{(shop === 'coles') ? "Coles" : "Woolsworth"}</text>
            </div>
            <div className="search-list-grid">
                {
                    filteredItems.map((item: any, index) => (
                            <ItemSearchCard 
                            storeName= {shop}
                            plusOrMinusSign="+" 
                            itemImage={item.image || "meat.png" }
                            price={item.price} 
                            itemName={item.name}
                            onHeartClick={() => {}} 
                            onAddItemClick={() => {}}
                            key={item.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ItemSearchList