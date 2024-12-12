import React, {useState} from "react";
import './Search.css'
import ItemSearchList from '../../components/ItemSearchList/ItemSearchList';
import SortDropDown from "../../components/SortDropDown/SortDropDown";

const Cart = () => {
    const sortBy = ['Lowest unit price', 'Closest match', 'Price (low to high)', 'Price (high to low)'];
    const [currSort, setCurrSort] = useState(sortBy[0]);
    const handleSetCurrSort = (newCurrSort: string) => {
      setCurrSort(newCurrSort);
      console.log(newCurrSort);
    }

    return(
        <div className='profile-flex'>
            <div> search page </div>
            <div className="item-search-box">
                <div className="item-search-header">
                    <text className="account-title">Showing search for "bwfgregewg"</text>
                </div>

                <div className="custom-divider"></div>  {/* Styled div for the line */}

                <div id='search-products-filter-sort'>
                    <h2 style={{'marginRight': '10px'}}>Sort by:</h2>
                    <SortDropDown dropDownList={sortBy} currSelected={currSort} setCurrSelected={handleSetCurrSort}/>
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