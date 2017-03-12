import React, {PropTypes} from 'react';

const RemoveContactButton = props => {
  return (
    <button
      className="remove-contact-button"
      type="button"
      onClick={event => props.onClickRemove(event)}
    >
      Remove
    </button>
  );
};

RemoveContactButton.propTypes = {
  onClickRemove: PropTypes.func.isRequired
};

export default RemoveContactButton;
