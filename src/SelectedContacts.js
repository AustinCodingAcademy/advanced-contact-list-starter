import React, {Component} from 'react';

class SelectedContacts extends Component {
  constructor() {
    super();

    this.state = {
      message: 'No contacts selected'
    };
  }

  handleClick() {
    alert(this.state.message);
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
