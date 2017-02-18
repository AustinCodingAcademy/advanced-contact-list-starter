import React, {PropTypes} from 'react';

const ActionItem = props => {
  return (
    <li>
      <div>{props.message}</div>
    </li>
  );
};

export default ActionItem;

ActionItem.propTypes = {
  message: PropTypes.array.isRequired
};
