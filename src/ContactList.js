import React from 'react';
import Contact from './Contact';

/* eslint-disable max-len */
const ContactList = props => {
  return (
    <div>
      <ul className="contact-list">
        {props.noContacts}
        {props.contacts.map(contact => {
          return (
            <Contact
              id={contact._id}
              key={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
              clickHandle={props.clickHandle}
              permDelete={props.permDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: React.PropTypes.array.isRequired,
  clickHandle: React.PropTypes.func.isRequired,
  permDelete: React.PropTypes.func.isRequired
};

export default ContactList;
