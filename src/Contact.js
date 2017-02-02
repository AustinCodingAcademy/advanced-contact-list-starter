import React, { PropTypes } from 'react';

const Contact = props => {
  return (
    <li className="contact" onClick={props.onSelectClick}>
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
};

export default Contact;
