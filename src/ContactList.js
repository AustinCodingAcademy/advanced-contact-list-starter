import React from 'react';
import Contact from './Contact';

// Converted from a class based component to a functional component
const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.noContacts}
      {props.contacts.map(contact => {
        return (
          <Contact
            key={contact._id}
            id={contact._id}
            name={contact.name}
            avatar={contact.avatar}
            occupation={contact.occupation}
            handleOnClick={props.onClick}
            onDeleteContact={props.onDeleteContact}
          />
        );
      })}
    </ul>
  );
};

// ESLint React prop-type validation
ContactList.propTypes = {
  contacts: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onDeleteContact: React.PropTypes.func.isRequired
};

export default ContactList;
