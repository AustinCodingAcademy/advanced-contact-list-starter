import React, { PropTypes } from 'react';
import ContactName from './ContactName/index';



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
      <div className="button remove"
        title="Remove contact"
        onClick={e => props.onRemove(e, props._id)}>
        Remove
      </div>
      <div className="button delete"
        title="Delete contact (This action cannot be reset)"
        onClick={e => props.onDelete(e, props._id)}>
        Delete
      </div>
    </li>
  );
};

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  _id: PropTypes.string.isRequired
};

export default Contact;
