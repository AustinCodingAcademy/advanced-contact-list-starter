import React from 'react';


const SearchBar = props => {
  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={(event) => props.onChange(event)}
      />
  );
};

SearchBar.propTypes = {
  value: React.propTypes.string.isRequired,
  onChange: React.propTypes.func.isRequired
};

export default SearchBar;
