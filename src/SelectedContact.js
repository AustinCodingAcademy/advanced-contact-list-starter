import React, { PropTypes } from 'react';

const SelectedContact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
      <button onClick={props.onUnselectClick}> remove </button>
    </li>
  );
};

SelectedContact.propTypes = {
  avatar: PropTypes.string.isRequired,
  onUnselectClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired
};

export default SelectedContact;
