/* Broken as of 03/18/17 */

import React, { PropTypes } from 'react';
import LoadingWidget from './LoadingWidget/index';

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
      break;
    default:
      break;
  }
  return (
    <div className="freeze-window">
      <div className="alert">
        <p>
          {message}
        </p>
        <LoadingWidget />
      </div>
    </div>
  );
};

export default AlertWindow;

AlertWindow.propTypes = {
  message: PropTypes.string.isRequired
};
