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
        <div className="add-start" onClick={() => props.handleFav(props.id)}>
          <span className={props.buttonText}></span>
        </div>
        <div className="add-start" onClick={() => props.handleDelete(props.id, props.listName.toString().toLowerCase())}>
          <span className="fa fa-minus-square"></span>
        </div>
      </li>
    );
}

export default Contact;
