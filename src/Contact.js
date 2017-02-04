import React, {PropTypes} from 'react';

/* eslint-disable react/prop-types */
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
  // The naem of the contact, no more than 150 chars
  name: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,

  onButtonClick: PropTypes.func.isRequired
};
