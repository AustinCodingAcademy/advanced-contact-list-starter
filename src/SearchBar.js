import React from 'react';

//  Refactored SearchBar component to be a stateless function.
//  State is pushed up to App.js
//  Ask about ESLint errors '... missing props validation'

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
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};


export default SearchBar;
