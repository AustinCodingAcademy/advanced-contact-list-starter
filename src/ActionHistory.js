/**
 * Created by brianmichael on 2/1/17.
 */
import React from 'react';
import FontAwesome from 'react-fontawesome';

const ActionHistory = (props) => {
  return (
    <section className="action-history">
      <h3>Action History</h3>
      {
          this.props.actions.map(action => {
            return (<p
              key={action._id}
              onClick={(event) => props.removeAction(event, action._id)}>
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
  actions: React.PropTypes.object,
  removeAction: React.PropTypes.function
};


export default ActionHistory;
