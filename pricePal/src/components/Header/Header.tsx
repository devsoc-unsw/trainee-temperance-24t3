import React from "react";
import './Header.css';
import Person2Icon from '@mui/icons-material/Person2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return(
    <>
    <header className="header">
        <div className="logo">LOGO HERE</div>
        <div className="search-bar-container">
          <div className="search-bar-wrapper">
            <SearchIcon className="search-icon" />
            <input type="text" className="search-bar" placeholder="Search for grocery items"/>
          </div>
        </div>
        <div className="icon-buttons">
        <button className="icon">
          <ListAltIcon />
        </button>
        <button className="icon">
          <ShoppingCartIcon />
        </button>
        <button className="icon">
          <Person2Icon />
        </button>

        </div>
        
    </header>
    </>
  );
};

export default Header;
