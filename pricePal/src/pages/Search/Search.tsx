import React, {useState, useEffect} from "react";
import './Search.css';
import GreyContainer from "../../components/GreyContainer/GreyContainer";
import SortDropDown from "../../components/SortDropDown/SortDropDown";
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
      <div id='search-page'>
        <GreyContainer>
          <h1>Showing results for "bread"</h1>
          <hr/>
          <div id="search-page-flex-container">
            <div id='search-products-filter-container'>
              <div id='search-products-filter-filterButtons'>
                <h2>Filter by:</h2>
              </div>
              <div id='search-products-filter-sort'>
                <h2 style={{'marginRight': '10px'}}>Sort by:</h2>
                <SortDropDown dropDownList={sortBy} currSelected={currSort} setCurrSelected={handleSetCurrSort}/>
              </div>
            </div>
            <div id='search-products-container'>
              <div className="search-products-title-header" id="search-products-coles-header">
                COLES
              </div>
              <div className="search-products-title-header" id="search-products-woolies-header">
                WOOLWORTHS
              </div>
            </div>
          </div>

        </GreyContainer>
      </div>

    </>
  )
}

export default Search;
