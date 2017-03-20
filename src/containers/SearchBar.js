import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchText } from '../actions/index';

class SearchBar extends Component {

  handleSearchText(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={this.props.value}
          onChange={event => this.handleSearchText(event)}
          />
      </div>
    );
  }
}

SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    value: state.searchText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({onChange: searchText}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
