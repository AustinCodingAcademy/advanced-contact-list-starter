import React from 'react';

const SearchBar = (props) => {
  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={event => props.onChange(event)}
      />
  );
};

export default SearchBar;
