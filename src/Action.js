import React from 'react';

const Log = props => {
  // Setup is similar to Contact.js
  return (
    <li className="Log lg-col-12">
      <div className="logItem">
        <button
          // Button to delete action
          onClick={() => props.onDeleteAction(props.log)}
          className="fa fa-times"
          aria-hidden="true"
        />
        {props.log}
      </div>
    </li>
  );
};

// ESLint React prop-type validation
Log.propTypes = {
  onDeleteAction: React.PropTypes.func.isRequired,
  log: React.PropTypes.string.isRequired
};

export default Log;
