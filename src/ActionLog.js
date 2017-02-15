import React from 'react';
import Log from './Action';

const ActionLog = props => {
  // Setup is similar to ContactList.js
  return (
    <ul className="Action-Log">
      {props.actionLog.map((log, index) => {
        return (
          <Log
            key={index}
            actionLogArray={props.actionLog}
            log={log}
            onDeleteAction={props.onDeleteAction}
          />
        );
      })}
    </ul>
  );
};

// ESLint React prop-type validation
ActionLog.propTypes = {
  actionLog: React.PropTypes.array.isRequired,
  onDeleteAction: React.PropTypes.func.isRequired
};

export default ActionLog;
