import React, {PropTypes} from 'react';
import Contact from './Contact.js';

const ContactList = (props) => {
  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        return (
          <Contact
            {...contact}
            key={contact._id}
            onRemove={(index) => props.onRemove(index)}
            // name={contact.name}
            // avatar={contact.avatar}
            // occupation={contact.occupation}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactList;
