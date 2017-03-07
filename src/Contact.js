import React from 'react';

const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" onClick={() => props.clickHandle(props.id)} />
      </div>
      <div className="contact-info">
        <h2 onClick={() => props.clickHandle(props.id)}>{props.name}</h2>
        {props.occupation}
      </div>
      <button
        onClick={() => props.permDelete(props.id)}
        className="fa fa-trash"
        aria-hidden="false"
      />
    </li>
  );
};

Contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
};

export default Contact;
