import React, { PropTypes } from 'react';

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.function.isRequired
};

const SearchBar = (props) => {

  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={(event) => props.onChange(event)}
    />
  );
};

export default SearchBar;
