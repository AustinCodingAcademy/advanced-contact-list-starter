import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {

  render() {
    return (
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={this.props.value}
          thing={this.props.searchBar}
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

// whatever is returned from this function will show up
// as props from reducers
function mapStateToProps(state) {
  return {
    searchBar: state.searchBar
  };
}

export default connect(mapStateToProps)(SearchBar);
