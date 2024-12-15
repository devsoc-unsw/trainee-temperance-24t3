import React, { useState } from "react";
import './Header.css';
import Person2Icon from '@mui/icons-material/Person2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

// interface HeaderProps {
//   onSearch: (query: string) => void;  // Typing onSearch as a function that takes a string and returns void
// }

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigateTo = (url: string) => {
    window.location.href = url; 
  };

  // // Handle input change
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchInput(e.target.value); // Save the input value in state
  // };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigateTo(`/search?query=${searchQuery}`);
    }
  };

  // Trigger a search when the user presses "Enter"
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // onSearch(searchInput); // Pass the searchInput to the parent component or a search handler
      handleSearch();
    }
  };

  return(
    <>
    <div className="header-wrapper">
      <header className="header">
        <div 
            className="logo"
            onClick={() => navigateTo('/')}>
            PricePal
        </div>
        <div className="search-bar-container">
          <div className="search-bar-wrapper">
            <SearchIcon className="search-icon" />
            <input 
                type="text" 
                className="search-bar" 
                placeholder="Search for grocery items"
                value={searchQuery}  
                onChange={(e) => setSearchQuery(e.target.value)} 
                onKeyPress={handleKeyPress}   // Trigger search on "Enter"
            />
          </div>
        </div>
        
        <div className="icon-buttons">
          <button 
            className="icon"
            onClick={() => navigateTo('/favorites')}>
            <ListAltIcon />
          </button>
          <button 
            className="icon"
            onClick={() => navigateTo('/cart')}>
            <ShoppingCartIcon />
          </button>
          <button 
            className="icon"
            onClick={() => navigateTo('/profile')}>
            <Person2Icon />
          </button>
        </div>
          
      </header>
    </div>
    </>
  );
};

export default Header;

