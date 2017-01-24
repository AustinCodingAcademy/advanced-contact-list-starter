import React, { PropTypes } from 'react';

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  onRemove: PropTypes.function.isRequired,
  _id: PropTypes.number.isRequired
};

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
      <div className="remove" onClick={() => props.onRemove(props._id)}>
        Remove
      </div>
    </li>
  );
};

export default Contact;
