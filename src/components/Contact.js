import React, { PropTypes } from 'react';
import ContactNameContainer from '../containers/ContactNameContainer';

const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <ContactNameContainer
          name={props.name}
        />
        {props.occupation}
      </div>
      <button className="select-button" onClick={props.onSelectClick}>Select</button>
      <button className="remove-button" onClick={props.onRemoveClick}>Remove</button>
    </li>
  );
};

Contact.propTypes = {
  occupation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Contact;
