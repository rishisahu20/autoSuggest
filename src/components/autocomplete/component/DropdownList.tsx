import React from 'react';

interface DropdownListProps {
  suggestions: Country;
  onItemClick: (selectedItem: string) => void;
}

interface Country {
  name: string;
  region: string;
  latlng: [number, number];
  callingCodes: string[];
}

const DropdownList: React.FC<DropdownListProps> = ({
  suggestions,
  onItemClick,
}) => {
  const handleItemClick = (item: Country) => {
    onItemClick(item);
  };

  return (
    <ul className='dropdown-list'>
      {suggestions.map((item, index) => (
        <li
          key={index}
          onClick={() => handleItemClick(item)}
          className='dropdown-item'
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
