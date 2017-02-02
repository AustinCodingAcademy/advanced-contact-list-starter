/**
 * Created by brianmichael on 1/23/17.
 */
import React from 'react';
import Highlighter from './Highlighter';

const Contact = (props) => {

  return (
    <li
      className="contact"
      >
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>
          <Highlighter searchWords={props.value} textToHighlight={props.name} />
        </h2>
        <h3>{props.occupation}</h3>
      </div>

      <button
        className="select-button"
        id={props.id}
        onClick={(event) => props.handleSelectContactClick(event)}>Select
        </button>
    </li>
  );
};


Contact.propTypes = {
  avatar: React.propTypes.string,
  value: React.propTypes.string,
  name: React.propTypes.string,
  occupation: React.propTypes.string,
  id: React.propTypes.string,
  handleSelectContactClick: React.propTypes.function
};

export default Contact;
