import React from 'react';

export default class SearchBar extends React.Component {


  render() {
    return (
      <div>
        <h1>Search:</h1>
        <input className="search-bar"
          type="text"
          value={this.props.value}
          onChange={event => this.props.handleSearch(event.target.value)}
          />
      </div>
    );
  }   
}

SearchBar.propTypes = {
  value: React.PropTypes.string,
  handleSearch: React.PropTypes.func,
};
