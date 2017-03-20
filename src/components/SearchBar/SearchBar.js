import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {

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
        placeholder="Search..."
        value={this.props.value}
        onChange={event => this.handleChange(event)}
      />
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
