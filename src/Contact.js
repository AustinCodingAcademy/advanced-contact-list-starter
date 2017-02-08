import React, { PropTypes } from 'react';

const Contact = props => {
  return (
    <div>
      <li
        onClick={props.onSelectClick}
        className="contact">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
        </div>
        <span
          onClick={props.onSelectClick}> select
        </span>
        <span
          className="deleteSpan"
          onClick={props.onDeleteClick}> delete
         </span>
      </li>
    </div>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
export default Contact;
