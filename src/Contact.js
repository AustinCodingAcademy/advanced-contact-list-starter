import React from 'react';
import { Link } from 'react-router-dom';
// import ContactName from './ContactName';
//    ^ removed during switch to client side routing

const Contact = props => {
    return (
      <Link to={`/profile/${props.id}`} className="contact-link">
        <li onClick={ () => props.onClick(props.name)} className="contact">
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
      </Link>
    );
}

export default Contact;

contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTyes.string.isRequired,
  occupation: React.ProppTypes.string.isRequired,
}
