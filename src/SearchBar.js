import React from 'react';

const SearchBar = (props) => {
  return (
    <input
      className="search-bar"
      type="text"
      value={this.props.value}
      onChange={(event) => props.onChange(event)}
      />
  );
};

SearchBar.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.function
};

export default SearchBar;
