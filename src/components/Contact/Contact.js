import React, {PropTypes} from 'react';
import RemoveContactButton from '../RemoveContactButton/RemoveContactButton';
import ContactName from '../ContactName/ContactName';

const Contact = props => {
  return (
    <li className="contact" onClick={() => props.onClickSelect(props._id)}>
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <ContactName
          name={props.name}
          _id={props._id}
          // onClickSelect={index => props.onClickSelect(index)}
          searchText={props.searchText}
        />
        {props.occupation}
      </div>
      <RemoveContactButton onClickRemove={event => props.onClickRemove(event, props._id)} />
    </li>
  );
};

Contact.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
};


export default Contact;
