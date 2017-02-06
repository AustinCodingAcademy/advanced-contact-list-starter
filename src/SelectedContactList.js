import React, { PropTypes } from 'react';
import SelectContact from './SelectContact';

const SelectContactList = props => {
  return (
    <div className="App">
      <h1>{props.selectedContacts.length > 0 ? 'Selected Contacts' : 'No Contacts Selected'}</h1>
      <ul>
        {props.selectedContacts.map(selectedcontact => {
          return (
            <SelectContact
              key={selectedcontact._id}
              name={selectedcontact.name}
              occupation={selectedcontact.occupation}
              avatar={selectedcontact.avatar}
              onUnselectClick={() => props.onUnselectContact(selectedcontact)}
            />
          );
        })}

      </ul>
    </div>
  );
};

SelectContactList.propTypes = {
  selectedContacts: PropTypes.array.isRequired,
  onUnselectContact: PropTypes.func.isRequired
};

export default SelectContactList;
