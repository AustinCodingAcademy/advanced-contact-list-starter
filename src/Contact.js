import React, { PropTypes } from 'react';

const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
      <button onClick={props.onSelectClick}>Select</button>
      <button onClick={props.onRemoveClick}>Remove</button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
};

export default Contact;
