import React, { PropTypes } from 'react';
import ContactList from './ContactList';

const SelectedContactList = (props) => {
  const selectable = true;

  return (
    <div className="selected-contact">
      <h1>{props.contacts.length > 0 ? 'Selected contacts' : 'No contacts selected'}</h1>
      <ContactList
        contacts={props.contacts}
        selectable={selectable}
        onUnselect={(id) => props.onUnselect(id)}
      />
    </div>
  );
};

export default SelectedContactList;

SelectedContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onUnselect: PropTypes.func.isRequired
};
