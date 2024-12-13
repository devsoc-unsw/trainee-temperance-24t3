import React, { useState, useRef, useEffect } from "react";
import './CategoryDropDown.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategoryDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toUpperCase());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const category = [
    'International Food', 'Fruit and Veg', 'Meat, Poultry, Seafood', 'Bakery', 
    'Deli', 'Dairy, Eggs, Fridge', 'Pantry', 'Alcohol', 'Freezer', 'Drink', 
    'Pet', 'Baby', 'Health and Beauty', 'Household'
  ];

  const filteredItems = category.filter(category =>
    category.toUpperCase().includes(filter)
  );

  return (
    <div className="dropdown">
      <button onClick={handleToggleDropdown} className="dropbtn">
        <div className="dropbtn-content">
          <span>All</span>
          <KeyboardArrowDownIcon />
        </div>
      </button>
      {isOpen && (
        <div id="myDropdown" className="dropdown-content" ref={menuRef}>
          <input
            type="text"
            placeholder="Search.."
            id="myInput"
            value={filter}
            onChange={handleFilterChange}
          />
          {filteredItems.map((item, index) => (
            <a key={index} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
