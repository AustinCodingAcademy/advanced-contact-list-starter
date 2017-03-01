import React from 'react';
import Contact from './Contact';

//  refactored ContactList component to be a stateless function. state has been
//  pushed up to App.js.
const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.noContacts}
      {props.contacts.map(contact => {
        return (
          <Contact
            key={contact._id}
            name={contact.name}
            avatar={contact.avatar}
            occupation={contact.occupation}
            id={contact._id}
            onClick={props.onClick}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  noContacts: React.PropTypes.func.isRequired,
  contacts: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired
};


export default ContactList;
