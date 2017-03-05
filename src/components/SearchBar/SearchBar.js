import React, {
  Component,
  PropTypes
} from 'react';

class SearchBar extends Component {
  handleSearchBarChange(event) {
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
        onChange={event => this.handleSearchBarChange(event)}
      />
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default SearchBar;
