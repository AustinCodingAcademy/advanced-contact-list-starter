import React, { Component } from 'react';
import { PropTypes } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <input
        className="search-bar"
        type="text"
        value={this.props.value}
        onChange={(event) => this.props.onChange(event)}
      />
    );
  }
}

export default SearchBar;
SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
