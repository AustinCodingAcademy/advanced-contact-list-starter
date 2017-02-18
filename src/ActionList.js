import React, { PropTypes } from 'react';
import ActionItem from './ActionItem';

const ActionList = props => {
  return (
    <ul>
      <ActionItem
        message={props.actionMessage}
      />
    </ul>
  );

};

export default ActionList;

ActionList.propTypes = {
  actionMessage: PropTypes.array.isRequired
};
