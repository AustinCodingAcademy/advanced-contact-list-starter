import React from 'react';
import Contact from './Contact';

/* eslint-disable max-len */
const ContactList = (props) => {
  return (
    <ul className="contact-list">
      {props.contacts.maps(contact => {
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
};

export default ContactList;
