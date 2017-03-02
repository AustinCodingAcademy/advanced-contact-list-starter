import React from 'react';

const Activity = props => {
  return (
    <div className="activity-log">
      <h4>Recent Activity</h4>
      <ul className="activity-items">
        {props.activity.length > 0 ? props.activity.map(action => {
          return <li>{action}</li>
        }) : <li>No activity</li>}
      </ul>
    </div>
  )
}

export default Activity;
