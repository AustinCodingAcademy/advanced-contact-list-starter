import React, { PropTypes } from 'react';
import SelectedContact from './SelectedContact';

const SelectedContactList = props => {
  return (
    <div className="selected-contact-list">
      <h1>{props.selectedContacts.length > 0 ? 'Selected Contacts' : 'No Contacts Selected'}</h1>
      <ul>
        {props.selectedContacts.map(selectedContact => {
          return (
            <SelectedContact
              key={selectedContact._id}
              name={selectedContact.name}
              occupation={selectedContact.occupation}
              avatar={selectedContact.avatar}
              onUnselectClick={() => props.onUnselectContact(selectedContact)}
            />
          );
        })}
      </ul>
    </div>
  );
};

SelectedContactList.propTypes = {
  selectedContacts: PropTypes.array.isRequired,
  onUnselectContact: PropTypes.func.isRequired
};

export default SelectedContactList;
