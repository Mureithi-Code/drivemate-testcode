import React, { useState } from 'react';
import styles from './Search.module.css';  // Ensure correct import path

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(input);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search car..."
        value={input}
        onChange={handleChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default Search;