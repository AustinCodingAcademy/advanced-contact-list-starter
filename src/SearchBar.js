import React from 'react';

const SearchBar = props => {
    return (
      <div>
        <input
          className='search-bar'
          type="text"
          value={props.searchText}
          onChange={ (event) => props.onChange(event) }
        />
        
      </div>
    );
}

export default SearchBar;
