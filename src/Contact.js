import React, { PropTypes } from 'react';
import ContactName from './ContactName';



const Contact = props => {

  return (
    <li className="contact" onClick={() => props.onSelect(props._id)}>
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <ContactName
          name={props.name}
          searchValue={props.searchValue}
          id={props._id}
        />
        {props.occupation}
      </div>
      <div className="button remove" onClick={e => props.onRemove(e, props._id)}>
        Remove
      </div>
    </li>
  );
};

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  _id: PropTypes.number.isRequired
};

export default Contact;
