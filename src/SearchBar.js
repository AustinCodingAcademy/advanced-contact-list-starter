import React, { Component } from 'react';


//Searchbar is pretty simple
//It is a simple component with a render function that will need to collect 2 props
class SearchBar extends Component {
  render() {
    return (
      //We create an html input tag
      <input
        className="search-bar"
        type="text"

        value={this.props.value}
        //We create a prop to take in an event handler after an onChange
        onChange={event => this.props.onChange(event)}
      />
    );
  }
}

export default SearchBar;
