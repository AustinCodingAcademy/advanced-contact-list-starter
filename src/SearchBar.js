import React, { Component } from 'react';
import ContactList from './ContactList.js';

class SearchBar extends Component {
  render() {
    return (
      <input
        className='serach-bar'
        type="text"
        value={this.props.value}
        onChange={ (event) => this.props.onChange(event) }
      />
    );
  }
}

export default SearchBar;
