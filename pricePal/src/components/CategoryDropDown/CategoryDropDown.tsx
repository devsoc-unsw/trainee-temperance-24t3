import React, { useState, useRef, useEffect } from "react";
import './CategoryDropDown.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategoryDropDown: React.FC<{ onFilterChange: (categories: string[]) => void }> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toUpperCase();
    setFilter(searchTerm);

    // Expand the first matching category
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

  const handleCategoryClick = (subcategory: string) => {
    let newSelectedCategories: string[] = [];
    
    if (selectedCategories.includes(subcategory)) {
      newSelectedCategories = selectedCategories.filter(cat => cat !== subcategory);
    } else {
      newSelectedCategories = [...selectedCategories, subcategory];
    }

    setSelectedCategories(newSelectedCategories);
    onFilterChange(newSelectedCategories); 
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
      name: "meat, poultry, seafood",
      subcategories: ["meat", "poultry", "bbq", "seafood"],
    },
    {
      name: "bakery",
      subcategories: ["in store bakery", "prepared bread"],
    },
    {
      name: "dairy, eggs, fridge",
      subcategories: [
        "cheese",
        "milk",
        "yoghurt",
        "cream, custard and desserts",
        "butter and margarine",
        "eggs",
      ],
    },
    {
      name: "pantry",
      subcategories: [
        "breakfast and spreads",
        "tea",
        "baking",
        "herbs and spices",
        "snacks and confectionery",
        "pasta, rice, grains and legumes",
        "coffee",
      ],
    },
    {
      name: "freezer",
      subcategories: ["frozen fruit and veg", "frozen desserts", "ready to eat meals"],
    },
    {
      name: "drink",
      subcategories: [
        "sports and energy drinks",
        "soft drinks",
        "cold drinks",
        "low-lon-alcoholic drinks",
        "water",
        "tea and juices",
        "alcohol",
      ],
    },
    {
      name: "baby",
      subcategories: ["nappies", "baby food", "wipes", "bottles and feeding"],
    },
    {
      name: "health and beauty",
      subcategories: ["Bath and Skin Care"],
    },
    {
      name: "pet",
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
                    className={`arrow-icon ${expandedCategory === category.name && "open"}`}/>
                )}
              </div>
              {expandedCategory === category.name && category.subcategories.length > 0 && (
                <div className="sub-dropdown-content">
                  {category.subcategories.map((sub, subIndex) => (
                    <a
                      key={subIndex}
                      onClick={() => handleCategoryClick(sub)}
                      className={selectedCategories.includes(sub) ? "selected" : ""}
                      href="#!">
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
