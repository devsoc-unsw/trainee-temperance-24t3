import React, { useState, useRef, useEffect } from "react";
import './CategoryDropDown.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategoryDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null); // Tracks which subcategory menu is open
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
      setOpenSubMenu(null); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Categories & subcategories
  const categories = [
    {
      name: 'Meat, Poultry, Seafood',
      subcategories: ['Meat', 'Poultry', 'BBQ', 'Seafood'],
    },
    {
      name: 'Bakery',
      subcategories: ['In Store Bakery', 'Prepared Bread'],
    },
    {
      name: 'Dairy, Eggs, Fridge',
      subcategories: [
        'Cheese',
        'Milk',
        'Yoghurt',
        'Cream, Custard and Desserts',
        'Butter and Margarine',
        'Eggs',
      ],
    },
    {
      name: 'Pantry',
      subcategories: [
        'Breakfast and Spreads',
        'Tea',
        'Baking',
        'Herbs and Spices',
        'Snacks and Confectionery',
        'Pasta, Rice, Grains and Legumes',
        'Coffee',
      ],
    },
    {
      name: 'Freezer',
      subcategories: ['Frozen Fruit and Veg', 'Frozen Desserts'],
    },
    {
      name: 'Drink',
      subcategories: [
        'Sports and Energy Drinks',
        'Soft Drinks',
        'Cold Drinks',
        'Low-Non-Alcoholic Drinks',
        'Water',
        'Tea and Juices',
      ],
    },
    {
      name: 'Baby',
      subcategories: ['Nappies', 'Baby Food', 'Wipes', 'Bath and Skin Care', 'Bottles and Feeding'],
    },
    {
      name: 'Pet',
      subcategories: [],
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toUpperCase().includes(filter)
  );

  const handleSubMenuToggle = (categoryName: string) => {
    setOpenSubMenu(openSubMenu === categoryName ? null : categoryName);
  };

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
          {filteredCategories.map((category, index) => (
            <div key={index} className="dropdown-item">
              <div
                className="main-category"
                onClick={() => handleSubMenuToggle(category.name)}
              >
                {category.name}
                {category.subcategories.length > 0 && (
                  <KeyboardArrowDownIcon
                    className={`arrow-icon ${
                      openSubMenu === category.name ? 'open' : ''
                    }`}
                  />
                )}
              </div>
              {openSubMenu === category.name && category.subcategories.length > 0 && (
                <div className="sub-dropdown-content">
                  {category.subcategories.map((sub, subIndex) => (
                    <a key={subIndex} href={`#${sub.toLowerCase()}`}>
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
