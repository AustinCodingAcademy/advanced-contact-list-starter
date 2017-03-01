import React from 'react';
import { Link } from 'react-router-dom';

//  Refactored Contact component to be a stateless function.
//  state is pushed up to App.js
const Contact = props => {
  return (
    <Link to={`/profile/${props.id}`} className="contact-link">
      <li className="contact" onClick={() => props.onClick(props._id)}>
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
        </div>

        <button
      //  button to select contact
          className="select-button" onClick={props.handleSelectedContacts}>Select
        </button>
        <button
      //  button to delete contact
          className="delete-button" onDelete={() => props.onDelete(props._id)}>Delete
        </button>

      </li>
    </Link>
  );
};

Contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  _id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  handleSelectedContacts: React.PropTypes.func.isRequired
};


export default Contact;
