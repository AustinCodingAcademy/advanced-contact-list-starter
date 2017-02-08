import React from 'react';
import Contact from './Contact';

/* eslint-disable max-len */
const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        return (
          <Contact
            key={contact._id}
            name={contact.name}
            avatar={contact.avatar}
            occupation={contact.occupation}
            _id={contact._id}
            onClick={props.onClick}
            />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: React.propTypes.func.isRequired,
  onClick: React.propTypes.string.isRequired
};

export default ContactList;
