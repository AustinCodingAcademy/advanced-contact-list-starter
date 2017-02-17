import React from 'react';
import Contact from './Contact.js';

const ContactList = (props) => {
    return (
      <ul className="contact-list">
        {props.contacts.map(contact => {
          return (
            <Contact
              key={contact._id}
              id={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
              onClick={props.onClick}
              onDelete={props.onDelete}
              searchText={props.searchText}
            />
          )
        })}
      </ul>
    );
}

export default ContactList;
