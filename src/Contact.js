import React, {PropTypes} from 'react';
import RemoveContactButton from './RemoveContactButton.js';

const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2 onClick={() => props.onClickSelect(props._id)}>{props.name}</h2>
        {props.occupation}
      </div>
      <RemoveContactButton onClickRemove={() => props.onClickRemove(props._id)} />
    </li>
  );
};

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  onClickRemove: PropTypes.func.isRequired
};


export default Contact;
