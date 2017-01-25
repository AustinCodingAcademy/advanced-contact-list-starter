import React, {PropTypes} from 'react';

const RemoveContactButton = (props) => {
  return (
    <button className="remove-contact" type="button" onClick={() => props.onRemove()}>
      Remove
    </button>
  );
};

RemoveContactButton.propTypes = {
  onRemove: PropTypes.func.isRequired
};

export default RemoveContactButton;
