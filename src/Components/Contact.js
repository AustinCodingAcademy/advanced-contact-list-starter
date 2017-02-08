/**
 * Created by brianmichael on 1/23/17.
 */
import React from 'react';
import Highlighter from './Highlighter';

const Contact = props => {

  return (
    <li
      className={this.props.contact._id === this.props.activeContactId ?
          'contact active' : 'contact'}
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
        onClick={props.handleDeleteContactClick}>Delete
      </button>
      <button
        className="select-button"
        onClick={props.handleSelectContactClick}>Select
        </button>
    </li>
  );
};

Contact.propTypes = {
  activeContactId: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired,
  id: React.PropTypes.any.isRequired,
  handleSelectContactClick: React.PropTypes.func.isRequired,
  handleDeleteContactClick: React.PropTypes.func.isRequired
};

export default Contact;
