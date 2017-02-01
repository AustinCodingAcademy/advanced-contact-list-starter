import React from 'react';

export default class SearchBar extends React.Component {


  render() {
    return (
      <input className="search-bar"
        type="text"
        value={this.props.value}
        onChange={event => this.props.handleSearch(event.target.value)}
      />
    );
  }
}

SearchBar.propTypes = {
  value: React.PropTypes.string,
  handleSearch: React.PropTypes.isfunc,
};
