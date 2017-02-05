import React, { PropTypes } from 'react';



const SearchBar = (props) => {

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search..."
      value={props.value}
      onChange={(event) => props.onChange(event)}
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
