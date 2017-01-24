import React, { PropTypes } from 'react';
import Contact from './Contact.js';

/* eslint max-len: [1, {"ignoreUrls": true}] */

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

const ContactList = (props) => {

  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        return (
          <Contact {...contact} key={contact._id}
            onRemove={id => props.onRemove(id)}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
