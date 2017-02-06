import React from 'react';
import ContactName from './ContactName';

const Contact = props => {
    return (
      <li onClick={ () => props.onClick(props.id, props.name, props.occupation, props.avatar)} className="contact">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar"/>
        </div>
        <div className="contact-info">
          <ContactName
            name={props.name}
            searchText={props.searchText}
          />
          <h4 className="occupation">{props.occupation}</h4>
        </div>
      </li>
    );
}

export default Contact;
