import ItemSearchCard from "../ItemSearchCard/ItemSearchCard";
import './ItemSearchList.css'
interface ItemSearchListProps {
    headerType: string,
    shop: string,
    data: any[]
}

const ItemSearchList = ({headerType, shop, data} : ItemSearchListProps) => {

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