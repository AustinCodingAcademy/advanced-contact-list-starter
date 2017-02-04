import React from 'react';

const SearchBar = (props) => {
  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      placeholder="Enter a search term..."
      onChange={(event) => props.onChange(event)}
      />
  );
};

SearchBar.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default SearchBar;
