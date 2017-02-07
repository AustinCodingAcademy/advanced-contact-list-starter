import React, {PropTypes} from 'react';

const Action = props => {
  return (
    <li>
      {props.action.actionMessage}
      <button onClick={props.onRemoveClick}>X</button>
    </li>
  );
};

export default Action;

Action.propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  action: PropTypes.object.isRequired
};
