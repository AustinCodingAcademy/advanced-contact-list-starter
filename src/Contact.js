import React from 'react';

const Contact = props => {
  return (
    <li className="contact" onClick={() => props.onClick(props._id)}>
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

Contact.propTypes = {
  name: React.propTypes.string.isRequired,
  occupation: React.propTypes.string.isRequired,
  avatar: React.propTypes.string.isRequired,
  onClick: React.propTypes.func.isRequired
};

export default Contact;
