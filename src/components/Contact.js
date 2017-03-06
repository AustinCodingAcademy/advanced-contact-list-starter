/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, {PropTypes} from 'react';
const Contact = props => {
  return (
    <li className="contact" onClick={props.onClick}>
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
        <button onClick={props.onButtonClick}>Toggle</button>
      </div>
    </li>
  );
};

export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};
