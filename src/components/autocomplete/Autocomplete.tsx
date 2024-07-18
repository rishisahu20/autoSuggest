import React, { useState } from 'react';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
import SuggestionComp from './SuggestionComp';
import api from '@/utils/api';
import DropdownList from '@/components/autocomplete/component/DropDownList';

interface Country {
  name: string;
  region: string;
  latlng: [number, number];
  callingCodes: string[];
}

function AutoComplete() {
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');,

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
      setShowSuggestions(true);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInputVal = e.target.value;
    setUserInput(userInputVal);
    if (userInputVal.length > 0) {
      debounceOnChangeAsync(userInputVal);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const onItemClick = (country:Country): void => {
    setUserInput(country.name)
  }

  return (
    <div className='main-wrapper'>
      <input
        type='search'
        onChange={handleChange}
        value={userInput}
        placeholder='Search...'
        className='custom-input-style'
      />
      {showSuggestions && (
        <ul>
          {suggestions.map((country: Country, index: number) => (
            <li key={index}>{country.name}</li>
          ))}
        </ul>
      )}
   <DropdownList onItemClick={onItemClick} suggestions={suggestions}/>
    </div>
  );
}

export default AutoComplete;
