import React, {PropTypes} from 'react';

const Action = props => {
  return (
    <li>
      {props.action.actionMessage}
      <div onClick={props.onRemoveClick}>X</div>
    </li>
  );
};

export default Action;

Action.propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  action: PropTypes.object.isRequired
};
