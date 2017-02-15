import React, {PropTypes} from 'react';

const SelectedContact = props => {
  return (
    <li onClick={() => props.onClickDeselect(props._id)} className="contact selected-contact">
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

SelectedContact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  onClickDeselect: PropTypes.func.isRequired
};


export default SelectedContact;
