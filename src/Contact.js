/* eslint max-len: ["error", 1000]*/
<<<<<<< HEAD
/* UPDATED: up to Chapter 3 */

import React from 'react';

const Contact = props => {
  return (
    <li className="contact">
      <div className="image-cropper">
        <img src={this.props.avatar} alt="avatar" />
      </div>
      <div className="contact-info">
        <h2>{this.props.name}</h2>
        {this.props.occupation}
      </div>
    </li>
  );
};

export default Contact;
=======

import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <li className="contact">
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>{this.props.name}</h2>
          {this.props.occupation}
        </div>
      </li>
    );
  }
}

/* Fin! */
>>>>>>> 6261b595b54621a4e34f16c376439a22b1238abd
