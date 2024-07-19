import React, { useRef } from 'react';
import { DropdownListProps } from '@/components/types';
import useOutsideClick from '@/hooks/useOutsideClick';
import './index.css';

const DropdownList: React.FC<DropdownListProps> = ({
  suggestions,
  onItemClick,
  emptyAndHideList,
}) => {
  const dropDownRef = useRef<HTMLUListElement>(null);

  useOutsideClick(dropDownRef, emptyAndHideList);

  return (
    <ul ref={dropDownRef} className='dropdown-list'>
      {suggestions.map((item) => (
        <li
          key={'suggestions' + item.name}
          onClick={() => onItemClick(item)}
          className='dropdown-item'
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList; // Using React.memo to avoid unnecessary re-renders
