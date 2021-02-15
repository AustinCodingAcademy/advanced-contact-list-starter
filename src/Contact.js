
import React from 'react';

//even simpler than contact list is contact itself; it takes 3 props
//it requires a name, an occupation, and an avatar url which is linked to the src atttribute

const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{props.name}</h2>
        {props.occupation}
      </div>
    </li>
  );
};

/*
ORIGINAL CONTACT.JS WITHOUT REFACTOR

import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <li className="contact">
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2> {this.props.name} </h2>
          {this.props.occupation}
        </div>
      </li>
    );
  }
}

export default Contact;
*/
export default Contact;
