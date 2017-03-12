import React, { PropTypes } from 'react';
import Contact from './Contact';


const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.contacts.map( contact => {
        return (
          <Contact
            key={contact._id}
            name={contact.name}
            occupation={contact.occupation}
            avatar={contact.avatar}
            onSelectClick={() => props.onSelectContact(contact)}
            onRemoveClick={() => props.onRemoveContact(contact._id)}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onSelectContact: PropTypes.func.isRequired,
  onRemoveContact: PropTypes.func.isRequired
};

export default ContactList;
