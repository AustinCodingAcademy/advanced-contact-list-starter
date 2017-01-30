import React from 'react';
import Contact from './Contact';

/* eslint max-len: [1, {"ignoreUrls": true}] */

const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.contacts.map((contact) => {
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
