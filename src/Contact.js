import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
const Contact = props => {
  return (
    <Link to={`/profile/${props.id}`} className="contact-link">
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
            onClick={props.onSelectClick} > select
          </span>
          <span
            className="deleteSpan"
            onClick={props.onDeleteClick} > delete
           </span>
        </li>
      </div>
    </Link>
  );
};
Contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
export default Contact;
