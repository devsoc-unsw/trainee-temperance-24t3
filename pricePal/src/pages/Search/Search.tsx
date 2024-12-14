import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css";
import SortDropDown from "../../components/SortDropDown/SortDropDown";
import Header from "../../components/Header/Header";
import ItemSearchList from "../../components/ItemSearchList/ItemSearchList";
import CategoryDropDown from "../../components/CategoryDropDown/CategoryDropDown";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get('query');
    setSearchQuery(query);
  }, [searchParams]);

  const sortBy = ['Lowest unit price', 'Closest match', 'Price (low to high)', 'Price (high to low)'];
  const [currSort, setCurrSort] = useState(sortBy[0]);

  const handleSetCurrSort = (newCurrSort: string) => {
    setCurrSort(newCurrSort);
  };

  const [data, setData] = useState<object[]>([]);

  // Fetch products function
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

      const data2 = await response.json();
      setData(data2);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (searchQuery != null) {
      fetchProducts(searchQuery, []);
    }
  }, [searchQuery]);

  // Handle category filter changes
  const handleCategoryFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
  
    const categoryString = categories.length > 0 ? categories.join(',') : '';
  
    setSearchParams({
      query: searchQuery || '',
      categories: categoryString
    });
  
    fetchProducts(searchQuery || '', categories);  
  };

  // Update query and categories from URL
  useEffect(() => {
    const query = searchParams.get('query');
    const categoryParam = searchParams.get('categories');
    
    let categories: string[] = [];

    if (categoryParam) {
      categories = categoryParam.split(',');
    }

    setSearchQuery(query);
    fetchProducts(query || '', categories); 
  }, [searchParams]);

  let data2 = data;
  data2.sort((a:any,b: any) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))


  return(
    <>
      <Header/>
      <div className='profile-flex'>
          {/* <div> search page </div> */}
          <div className="item-search-box">
              <div className="item-search-header">
                  <text className="account-title">Showing search for "{searchQuery}"</text>
              </div>

                <div className="custom-divider"></div>  {/* Styled div for the line */}

                <div id ='category-filter'>
                    <h2>Filter by:</h2>
                    <CategoryDropDown onFilterChange={handleCategoryFilterChange} />
                </div>


              <div id='search-products-filter-sort'>
                  <h2 style={{'marginRight': '10px'}}>Sort by:</h2>
                  <SortDropDown dropDownList={sortBy} currSelected={currSort} setCurrSelected={handleSetCurrSort}/>
              </div>

            <div className="item-search-body">
                <ItemSearchList headerType='coles-header' shop='coles' data={data}></ItemSearchList>
                {/* <div className="cart-divider"></div> */}
                <ItemSearchList headerType='woolies-header' shop="woolies" data={data}></ItemSearchList>
            </div>
        </div>
      </div>
    </>
  )
}

export default Search;