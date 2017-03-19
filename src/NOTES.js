import React from 'react';
import { Link } from 'react-router-dom';

const Contact = (props) => {
  return (
    <Link to={`/profile/${props.id}`} className="contact-link">
      <li className="contact">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar"/>
        </div>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
        </div>
      </li>
    </Link>
  );
}

Contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
}

export default Contact;