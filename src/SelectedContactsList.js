import React, {PropTypes} from 'react';
import SelectedContact from './SelectedContact.js';

const SelectedContactsList = props => {
  return (
    <ul className="selected-contacts-list">
      {props.selectedContacts.map(contact => {
        return (
          <SelectedContact
            {...contact}
            key={contact._id}
            onClickDeselect={index => props.onClickDeselect(index)}
          />
        );
      })}
    </ul>
  );
};

SelectedContactsList.propTypes = {
  selectedContacts: PropTypes.array.isRequired
};

export default SelectedContactsList;
