import React, { PropTypes } from 'react';
import ActionHistoryItem from '../ActionHistoryItem/ActionHistoryItem';

const ActionHistoryList = props => {
  return (
    <ul className="action-history-list">
      <lh>
        <h2>Action History List</h2>
      </lh>
      {props.checkForUserActions}
      {props.actionHistory.map(actionHistoryItem => {
        return (
          <ActionHistoryItem
            {...actionHistoryItem}
            key={actionHistoryItem._id}
            removeHistoryItem={index => props.removeHistoryItem(index)}
            handleItemExpiration={index => props.handleItemExpiration(index)}
          />
        );
      })}
      <button onClick={() => props.onClickClearHistory()}>
        Clear Action History List
      </button>
    </ul>
  );
};

ActionHistoryList.propTypes = {
  actionHistory: PropTypes.array.isRequired,
  checkForUserActions: PropTypes.object,
  onClickClearHistory: PropTypes.func.isRequired,
  removeHistoryItem: PropTypes.func.isRequired
};

export default ActionHistoryList;
