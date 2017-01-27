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
      <div className="button unselect" onClick={() => props.onUnselect(props._id)}>
        Unselect
      </div>
    </li>
  );
};

SelectedContact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  onUnselect: PropTypes.func.isRequired,
  _id: PropTypes.number.isRequired
};

export default SelectedContact;
