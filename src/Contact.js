import React from 'react';
import ContactName from './ContactName';

const Contact = props => {
    return (
      <li onClick={ () => props.onClick(props.id)} className="contact">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar"/>
        </div>
        <div className="contact-info">
          <ContactName
            name={props.name}
            searchText={props.searchText}
          />
          {props.occupation}
        </div>
      </li>
    );
}

export default Contact;
