/**
 * Created by brianmichael on 2/1/17.
 */
import React from 'react';
import FontAwesome from 'react-fontawesome';

const ActionHistory = props => {
  return (
    <section className="action-history">
      <h3>Action History</h3>
      {
          props.actions.map(action => {
            return (<p
              key={action._id}
              onClick={() => props.removeAction(action._id)}>
              {action.description}
              <FontAwesome
                name="times" />
            </p>);
          })
        }
    </section>
  );
};


ActionHistory.propTypes = {
  actions: React.PropTypes.array.isRequired,
  removeAction: React.PropTypes.func.isRequired
};


export default ActionHistory;
