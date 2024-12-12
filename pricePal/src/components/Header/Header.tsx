import React from "react";
import './Header.css';
import Person2Icon from '@mui/icons-material/Person2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const navigateTo = (url: string) => {
    window.location.href = url; 
  };
  return(
    <>
    <header className="header">
      <button 
          className="logo"
          onClick={() => navigateTo('/home')}>
          <div className="logo">LOGO HERE</div>
      </button>
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <SearchIcon className="search-icon" />
          <input type="text" className="search-bar" placeholder="Search for grocery items"/>
        </div>
      </div>
      <div className="icon-buttons">
      <button 
        className="icon"
        onClick={() => navigateTo('/shoppinglist')}>
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
    </>
  );
};

export default Header;

