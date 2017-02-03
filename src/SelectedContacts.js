import React, { Component } from 'react';
import Contact from './Contact';

class SelectedContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      message: 'No contacts selected'
    };
  }

  render() {
    return (
      <div>
        <h3 onClick={this.handleClick}>
        -Selected Contacts-
        </h3>
      </div>
    );
  }
}

export default SelectedContacts;
