import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
      //here's where we sort our contact data into readable contacts
      //we take a prop (now from our db) and then create a contact component
        {this.props.contacts.map(contact => {
          return (
            <Contact
              key={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
            />
          );
        })}
      </ul>
    );
  }
}

export default ContactList;
