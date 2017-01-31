import React, { Component } from 'react';
import ContactList from './ContactList.js';

const SearchBar = props => {
    return (
      <input
        className='search-bar'
        type="text"
        value={props.value}
        onChange={ (event) => props.onChange(event) }
      />
    );
}

export default SearchBar;
