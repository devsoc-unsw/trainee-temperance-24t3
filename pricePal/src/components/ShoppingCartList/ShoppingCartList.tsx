import ShoppingCartCard from "../ShoppingCartCard/ShoppingCartCard";
import './ShoppingCartList.css'
interface ShoppingCartListProps {
    headerType: string,
    shop: string
}

const ShoppingCartList = ({headerType, shop} : ShoppingCartListProps) => {
    return(
        <div className="shopping-cart-list-body">
            <div className={headerType}>
                <text className="shop-header">{shop}</text>
            </div>
            <div className="shopping-list-grid">
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.123} itemName="Coles White Bread" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
                <ShoppingCartCard itemImage="https://gfproductsaustralia.com.au/wp-content/uploads/2022/04/Helgas-Gluten-Free-White-Bread-Slices-300x300.jpeg" price={4.26} itemName="fjdsakfdjs sajnd skajdhska" onAddItemClick={() => {}} onHeartClick={() => {}}/>
            </div>
            <div className="shopping-cart-text">Subtotal</div>
        </div>
    )
}

export default ShoppingCartList