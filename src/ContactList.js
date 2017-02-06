import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {

  render() {
    return (
      <ul className="contact-list">
        {this.props.contacts.map(contact => {
          return (
            <Contact
              key={contact._id}
              avatar={contact.avatar}
              name={contact.name}
              occupation={contact.occupation}
              onDeleteContact={contact.handleDeleteContact}
            />
          );
        })}
      </ul>
    );
  }
}

export default ContactList;
