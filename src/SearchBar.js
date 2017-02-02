import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <input
        className='search-bar'
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default SearchBar;
