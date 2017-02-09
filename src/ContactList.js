import React from 'react';
import Contact from './Contact';

const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        return (
          <Contact
            key={contact._id}
            id={contact._id}
            avatar={contact.avatar}
            name={contact.name}
            occupation={contact.occupation}
            onDeleteContact={props.onDeleteContact}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: React.PropTypes.array.isRequired,
  onDeleteContact: React.PropTypes.func.isRequired
};

export default ContactList;
