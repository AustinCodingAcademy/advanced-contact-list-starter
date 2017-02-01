import React, { PropTypes } from 'react';
import Contact from './Contact.js';
import SelectedContact from './SelectedContact';

/* eslint max-len: [1, {"ignoreUrls": true}] */



const ContactList = (props) => {

  return (
    <ul className="contact-list">
      {props.contacts.map(contact => {
        if (props.selectable) {
          return (
            <SelectedContact {...contact}
              key={contact._id}
              onRemove={id => props.onRemove(id)}
              onUnselect={id => props.onUnselect(id)}
            />
          );
        }
        return (
          <Contact {...contact}
            key={contact._id}
            searchValue={props.searchValue}
            onRemove={(e, id) => props.onRemove(e, id)}
            onSelect={props.onSelect}
          />
        );

      })}
    </ul>
  );
};

ContactList.propTypes = {
  searchValue: PropTypes.string,
  selectable: PropTypes.bool,
  contacts: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

export default ContactList;
