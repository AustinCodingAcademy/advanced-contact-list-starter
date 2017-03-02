import React, { PropTypes, Component } from 'react';

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
        placeholder="Search"
        value={this.props.value}
        onChange={event => this.handleChange(event)}
      />
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
//  handleChange: PropTypes.func,
  value: PropTypes.string.isRequired
};

export default SearchBar;
