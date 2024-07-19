import React, { useState } from 'react';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import api from '@/utils/api';
import DropdownList from '@/components/dropdownList';
import { Country } from '@/components/types';
import './index.css';

const AutoComplete: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');

  const debounceOnChangeAsync = useDebouncedCallback((text: string) => {
    loadOptions(text);
  }, 600);

  const loadOptions = async (text: string) => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get<Country[]>(`api/countries/${text}`);
      setSuggestions(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      emptyAndHideList();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInputVal = e.target.value;
    setUserInput(userInputVal);
    if (userInputVal.length > 0) {
      debounceOnChangeAsync(userInputVal);
    } else {
      emptyAndHideList();
    }
  };

  const onItemClick = (country: Country): void => {
    setUserInput(country.name);
    emptyAndHideList();
  };

  const emptyAndHideList = () => {
    setSuggestions([]);
  };

  return (
    <div className='auto-complete-wrapper'>
      <input
        type='search'
        onChange={handleChange}
        value={userInput}
        placeholder='Search...'
        className='custom-input-style'
      />
      {loading && <p className='loading-text'>...loading</p>}
      {suggestions?.length > 0 && (
        <DropdownList
          onItemClick={onItemClick}
          suggestions={suggestions}
          emptyAndHideList={emptyAndHideList}
        />
      )}
      {error && <p className='error-message'>something went wrrongs</p>}
    </div>
  );
};

export default AutoComplete;
