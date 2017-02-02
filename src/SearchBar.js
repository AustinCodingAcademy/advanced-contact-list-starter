import React, { PropTypes } from 'react';

const SearchBar = props => {
  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={event => props.onChange(event)}
    />
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchBar;
