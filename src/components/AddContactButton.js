/* Broken as of 03/18/17*/

import React, { PropTypes } from 'react';

const AddContactButton = (props) => {
  return (
    <div className="button add-contact"
      title="Add a contact"
      onClick={() => props.onOpenContact()}>
      + Add New
    </div>
  );
};

export default AddContactButton;

AddContactButton.propTypes = {
  onOpenContact: PropTypes.func.isRequired
};
