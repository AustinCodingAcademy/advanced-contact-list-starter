import React, { Component, PropTypes } from 'react';
import Contact from './Contact';

class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
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

ContactList.proptypes = {
  contacts: PropTypes.object,
};
