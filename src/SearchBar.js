import React from 'react';

// Converted from a class based component to a functional component
const SearchBar = props => {
  return (
    <input
      className="search-bar"
      placeholder="Search..."
      aria-hidden="true"
      type="text"
      value={props.value}
      onChange={event => props.onChange(event)}
    />
  );
};


SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default SearchBar;
