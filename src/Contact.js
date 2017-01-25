import React, {PropTypes} from 'react';
import RemoveContactButton from './RemoveContactButton.js';

const Contact = (props) => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
      <RemoveContactButton onRemove={() => props.onRemove(props._id)} />
    </li>
  );
};

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired
};


export default Contact;
