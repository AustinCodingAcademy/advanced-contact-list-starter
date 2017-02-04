import React, { PropTypes } from 'react';

const AlertWindow = (props) => {
  let message = '';

  switch (props.message) {
    case 'add':
      message = 'Adding contact';
      break;
    case 'get':
      message = 'Retrieving contacts';
      break;
    case 'delete':
      message = 'Deleting contact';
  }
  return (
    <div className="freeze-window">
      <div className="alert">
        <p>
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertWindow;

AlertWindow.propTypes = {
  message: PropTypes.string.isRequired
};
