import React, {
  PropTypes
} from 'react';

const SearchBar = props => {
  return (
    <input
      className="search-bar"
      type="text"
      value={props.searchText}
      onChange={event => props.onChange(event.target.value)}
    />
  );
};


SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default SearchBar;
