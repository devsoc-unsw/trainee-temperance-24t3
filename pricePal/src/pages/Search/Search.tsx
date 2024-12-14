import React, {useState, useEffect} from "react";
import { useSearchParams } from 'react-router-dom';
import './Search.css';
// import GreyContainer from "../../components/GreyContainer/GreyContainer";
import SortDropDown from "../../components/SortDropDown/SortDropDown";
import Header from "../../components/Header/Header";
import ItemSearchList from '../../components/ItemSearchList/ItemSearchList';
import CategoryDropDown from "../../components/CategoryDropDown/CategoryDropDown";

const Search = () => {
  const [searchParams] = useSearchParams();
  
  // query stuff here 
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => { 
    const query = searchParams.get('query');

    setSearchQuery(query);
  }, [searchParams]);
  //after this is just search stufF
  
  const sortBy = ['Lowest unit price', 'Closest match', 'Price (low to high)', 'Price (high to low)'];
  const [currSort, setCurrSort] = useState(sortBy[0]);
  const handleSetCurrSort = (newCurrSort: string) => {
    setCurrSort(newCurrSort);
  }
  
  const [data, setData] = useState<object[]>([]);

  useEffect(() =>  {
    const fetchProducts = async (name: string, category: string[]) => {
      try {
        const response = await fetch('https://backend-winter-sun-8133.fly.dev/fetch', {
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
        console.log(data2);
        setData(data2);
      } catch (error) {
        console.error('Error fetching products:', error);
      
      }
    };
    
    if (searchQuery != null) {
      fetchProducts(searchQuery, []);
    }
  }, [searchQuery]);

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
                    <CategoryDropDown />
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