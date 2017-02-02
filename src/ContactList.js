import React from 'react';
import Contact from './Contact';

const ContactList = props => {
    return (
      <div className="contact-container">
        <ul className="contact-list">
          <h1>{props.listName}</h1>
          {props.contacts.map(contact => {
            return (
              <Contact
                key={contact._id}
                name={contact.name}
                avatar={contact.avatar}
                occupation={contact.occupation}
                buttonText={props.buttonText}
                onClick={props.onClick}
                />
            )
          })}
      </ul>
    </div>
  );
}

export default ContactList;
