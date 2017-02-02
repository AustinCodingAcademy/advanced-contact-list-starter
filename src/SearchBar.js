import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <input
        className='search-bar'
        type="text"
        value={this.state.value}
        onChange={ (event) => this.handleChange(event) }
      />
    );
  }
}

export default SearchBar;
