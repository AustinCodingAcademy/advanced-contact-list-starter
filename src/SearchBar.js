import React, { Component } from 'react';
import ContactList from './ContactList.js';

class SearchBar extends Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     value: ''
  //   };
  // }

  // handleChange(event) {
  //   this.setState({
  //     value: event.target.value
  //   });
  // }

  render() {
    return (
      <input
        className='serach-bar'
        type="text"
        value={this.props.value}
        onChange={ (event) => this.props.onChange(event) }
      />
    );
  }
}

export default SearchBar;
