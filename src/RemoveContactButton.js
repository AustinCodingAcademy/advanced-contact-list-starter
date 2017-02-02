import React, {PropTypes} from 'react';

const RemoveContactButton = props => {
  return (
    <button type="button" onClick={props.onRemoveClick}>
      remove
    </button>
  );
};

RemoveContactButton.propTypes = {
  onRemoveClick: PropTypes.func.isRequired
};

export default RemoveContactButton;
