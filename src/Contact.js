import React from 'react';



const Contact = props => {
  return (
    <li className="contact" onClick={() => props.handleOnClick(props.id)}>
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
      <button className="delete-button"
        onClick={() => props.onDeleteContact(props.id)}>X</button>
    </li>
  );
};



Contact.propTypes = {
  key: React.PropTypes.number.isRequired,
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
  onDeleteContact: React.PropTypes.func.isRequired
};


export default Contact;
