import React, {PropTypes} from 'react';
import ActionListItem from './ActionListItem';

const ActionHistoryList = props => {
  return (
    <div className="action-history-list">
      <h3>Action History</h3>
      {props.actions.length > 0 ? null : 'Nothing has happened yet!'}
      <div className="actions-list">
        <ul>
          {props.actions.map(action => {
            console.log(action);
            return (
              <ActionListItem
                key={action._id}
                action={action}
                onRemoveClick={() => props.onRemoveAction(action._id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};


export default ActionHistoryList;

ActionHistoryList.propTypes = {
  actions: PropTypes.array.isRequired,
  onRemoveAction: PropTypes.func.isRequired
};
