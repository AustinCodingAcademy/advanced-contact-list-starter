import React from 'react';



const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
      <button className="delete-button" onClick={
        event => props.onClick(event)}>X</button>
    </li>
  );
};

Contact.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};


export default Contact;
