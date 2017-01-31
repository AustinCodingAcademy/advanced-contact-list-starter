import React, { PropTypes } from 'react';
import ContactList from './ContactList';

const SelectedContactList = (props) => {
  const selectable = true;

  return (
    <div className="side-bar selected-contact">
      <h3>{props.contacts.length > 0 ? 'Selected contacts' : 'No contacts selected'}</h3>
      <div className="side-bar-scroll">
        <ContactList
          contacts={props.contacts}
          selectable={selectable}
          onUnselect={(id) => props.onUnselect(id)}
        />
      </div>
    </div>
  );
};

export default SelectedContactList;

SelectedContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onUnselect: PropTypes.func.isRequired
};
