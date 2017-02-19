import React, {PropTypes} from 'react';

const ActionHistoryItem = props => {
  return (
    <li>
      {props.itemText}
      <button onClick={() => props.removeHistoryItem(props._id)}>
        &times;
      </button>
    </li>
  );
};

ActionHistoryItem.propTypes = {
  itemText: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  removeHistoryItem: PropTypes.func.isRequired
};

export default ActionHistoryItem;
