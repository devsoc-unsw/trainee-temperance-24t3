import React, {useState, useEffect, useRef} from "react";
import './SortDropDown.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DropDownProps {
  dropDownList: string[]
  currSelected: string
  setCurrSelected: (newSelected: string) => void;
}


const SortDropDown = ({dropDownList, currSelected, setCurrSelected}: DropDownProps) => {
  // const sortBy = ['Lowest unit price', 'Closest match', 'Price (low to high)', 'Price (high to low)'];
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSortDropDown = () => {
   console.log('clicking dropdown')
    setIsOpen(!isOpen);
  }

  // These functions allows the font size menu to be closed when the user clicks on other parts of the screen
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Adds an event listener to listen for clicks
  // When it listens to a click outside of the drop down menu button, it will close the menu list
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return(
    <>
      <div id='sort-by-drop-down-container'>
        <button id='sort-by-dropdown-btn' onClick={handleSortDropDown}>
          <div id='sort-by-dropdown-btn-text'>
            <h2>{currSelected}</h2>
            <KeyboardArrowDownIcon/>
          </div>
        </button>
        {isOpen && (
          <div id="sort-by-dropdown-menu" ref={menuRef}>
            {dropDownList.map((sortByText) => (
              // <div className={`font-size-drop-menu-item ${fontSizeNum === fontSize ? 'selected' : ''}`} onClick={() => handleChangeFontSize(fontSizeNum)}>{fontSizeNum}</div>
              <div className="sort-by-dropdown-menu-item">
                <div onClick={() => setCurrSelected(sortByText)}>
                  {sortByText}
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </>
  )
}
export default SortDropDown