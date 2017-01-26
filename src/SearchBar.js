import React, { Component } from 'react';
/* eslint max-len: [1, {"ignoreUrls": true}] */
class SearchBar extends Component {
  render() {
    return (
      <input
        className='search-bar'
        type="text"
        value={this.props.value}
        onChange={ event => this.props.onChange(event) }
      />
    );
  }
}

export default SearchBar;
