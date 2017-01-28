import React, { PropTypes } from 'react';

const Contact = props => {
  return (
    <li className="contact" onClick="{}">
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

export default Contact;
Contact.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  occupation: PropTypes.string
};
