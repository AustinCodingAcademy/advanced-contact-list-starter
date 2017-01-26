import React, { PropTypes } from 'react';
/*eslint-disable react/prop-types */

/*
class Contact extends Component {
  render() {
    return (
    */

const Contact = (props) => {
  return
  (
      <li className="contact" onClick={props.onClick}>
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar"/>
        </div>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
        </div>
      </li>
    );
  }


    export default Contact;

  Contact.propTypes = {
    //The name of the contact, no more that 150 char
    name: PropTypes.string.isRequired,

    onClick: PropTypes.func.isRequired
  };
  export default Contact;
