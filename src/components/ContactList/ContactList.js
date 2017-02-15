import React, {PropTypes} from 'react';
import Contact from '../Contact/Contact.js';

const ContactList = props => {
  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        return (
          <Contact
            {...contact}
            key={contact._id}
            onClickRemove={(event, index) => props.onClickRemove(event, index)}
            onClickSelect={index => props.onClickSelect(index)}
            searchText={props.searchText}
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
  contacts: PropTypes.array.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
};

export default ContactList;
