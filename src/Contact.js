import React from 'react';

const Contact = props => {
    return (
      <li className="contact">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar"/>
        </div>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
        </div>
        <div className="add-start" onClick={props.onClick}>
          <span>Fav</span>
        </div>
        <div className="add-start" onClick={() => props.onClick2(props.id)}>
          <span> - </span>
        </div>
      </li>
    );
}

export default Contact;
