import React, {PropTypes} from 'react';

const SelectContact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt={props.name} />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
      <span onClick={props.onUnselectClick}> select</span>
    </li>

  );
};

SelectContact.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  onUnselectClick: PropTypes.func.isRequired,

};
export default SelectContact;
