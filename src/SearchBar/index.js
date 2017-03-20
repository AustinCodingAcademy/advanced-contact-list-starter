import React, { Component } from 'react';
import { PropTypes } from 'react';

class SearchBar extends Component {
  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }
  render() {
    return (
      <input
        className="search-bar"
        type="text"
        value={this.props.value}
        onChange={(event) => this.handleChange(event)}
      />
    );
  }
}

export default SearchBar;
SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
