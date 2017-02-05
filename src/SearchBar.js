import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {

  render() {

    return (
      <div>
        <label className="search-bar">Search:</label>
        <input
          className="search-bar"
          type="text"
          value={this.props.value}
          onChange={event => this.props.onChange(event)}
      />
      </div>
    );
  }
}
SearchBar.propTypes = {

  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
