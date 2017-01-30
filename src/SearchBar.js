import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={this.props.value}
          onChange={event => this.props.onChange(event)}
          />
      </div>
    );
  }
}

export default SearchBar;
