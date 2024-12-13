import React, {useState, useEffect} from "react";
import './Search.css';
// import GreyContainer from "../../components/GreyContainer/GreyContainer";
import SortDropDown from "../../components/SortDropDown/SortDropDown";
import Header from "../../components/Header/Header";
import ItemSearchList from '../../components/ItemSearchList/ItemSearchList';

const Search = () => {
  const sortBy = ['Lowest unit price', 'Closest match', 'Price (low to high)', 'Price (high to low)'];
  const [currSort, setCurrSort] = useState(sortBy[0]);
  const handleSetCurrSort = (newCurrSort: string) => {
    setCurrSort(newCurrSort);
    console.log(newCurrSort);
  }
  const fetchProducts = async (name: string, category: string[]) => {
    try {
      const response = await fetch('http://localhost:3000/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts('Whisky', ['alcoholic']);
  }, [])

    return(
        <>
            <Header/>
            <div className='profile-flex'>
                {/* <div> search page </div> */}
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
        </>
    )
}


export default Search;