import React, {PropTypes} from 'react';

const RemoveContactButton = props => {
  return (
    <button className="remove-contact" type="button" onClick={() => props.onClickRemove()}>
      Remove
    </button>
  );
};

RemoveContactButton.propTypes = {
  onClickRemove: PropTypes.func.isRequired
};

export default RemoveContactButton;
