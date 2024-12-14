import React, { useState, useRef, useEffect } from "react";
import './CategoryDropDown.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategoryDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null); // Tracks which category should remain open
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toUpperCase();
    setFilter(searchTerm);

    // Expand first matching category
    const matchingCategory = categories.find(category => {
      return (
        category.name.toUpperCase().includes(searchTerm) ||
        category.subcategories.some(sub => sub.toUpperCase().includes(searchTerm))
      );
    });

    if (matchingCategory) {
      setExpandedCategory(matchingCategory.name);
    } else {
      setExpandedCategory(null);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setExpandedCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Categories with subcategories
  const categories = [
    {
      name: "Meat, Poultry, Seafood",
      subcategories: ["Meat", "Poultry", "BBQ", "Seafood"],
    },
    {
      name: "Bakery",
      subcategories: ["In Store Bakery", "Prepared Bread"],
    },
    {
      name: "Dairy, Eggs, Fridge",
      subcategories: [
        "Cheese",
        "Milk",
        "Yoghurt",
        "Cream, Custard and Desserts",
        "Butter and Margarine",
        "Eggs",
      ],
    },
    {
      name: "Pantry",
      subcategories: [
        "Breakfast and Spreads",
        "Tea",
        "Baking",
        "Herbs and Spices",
        "Snacks and Confectionery",
        "Pasta, Rice, Grains and Legumes",
        "Coffee",
      ],
    },
    {
      name: "Freezer",
      subcategories: ["Frozen Fruit and Veg", "Frozen Desserts", "Ready to eat meals"],
    },
    {
      name: "Drink",
      subcategories: [
        "Sports and Energy Drinks",
        "Soft Drinks",
        "Cold Drinks",
        "Low-Non-Alcoholic Drinks",
        "Water",
        "Tea and Juices",
        "Alcohol",
      ],
    },
    {
      name: "Baby",
      subcategories: ["Nappies", "Baby Food", "Wipes", "Bottles and Feeding"],
    },
    {
      name: "Health and Beauty",
      subcategories: ["Bath and Skin Care"],
    },
    {
      name: "Pet",
      subcategories: [],
    },
  ];

  // Filter categories and subcategories
  const filteredCategories = categories
    .map(category => {
      const filteredSubcategories = category.subcategories.filter(subcategory =>
        subcategory.toUpperCase().includes(filter)
      );

      // Include category if name matches filter or subcategories
      if (category.name.toUpperCase().includes(filter) || filteredSubcategories.length > 0) {
        return {
          ...category,
          subcategories: filteredSubcategories,
        };
      }
      return null;
    })
    .filter(category => category !== null) as typeof categories;

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
            placeholder="Search..."
            id="myInput"
            value={filter}
            onChange={handleFilterChange}
          />
          {filteredCategories.map((category, index) => (
            <div key={index} className="dropdown-item">
              <div
                className="main-category"
                onClick={() => {
                  if (expandedCategory === category.name) {
                    setExpandedCategory(null);
                  } else {
                    setExpandedCategory(category.name);
                  }
                }}>
                {category.name}
                {category.subcategories.length > 0 && (
                  <KeyboardArrowDownIcon
                    className={`arrow-icon ${expandedCategory === category.name && "open"}`}
                  />
                )}
              </div>
              {expandedCategory === category.name && category.subcategories.length > 0 && (
                <div className="sub-dropdown-content">
                  {category.subcategories.map((sub, subIndex) => (
                    <a key={subIndex} href={`#${sub.toLowerCase()}`}>{sub}</a>
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
