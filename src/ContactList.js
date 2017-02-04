import React, { Component } from 'react';
import Contact from './Contact';


/* eslint max-len: ["error", 180]*/

export default class ContactList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="contact-list">
        {this.props.data.map((contact) => <Contact
          key={contact._id}
          name={contact.name}
          avatar={contact.avatar}
          occupation={contact.occupation}
          onClick={this.handleContactClick}
            />)}
      </ul>
    );
  }
}
