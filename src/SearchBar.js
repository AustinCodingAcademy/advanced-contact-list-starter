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

SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchBar;
