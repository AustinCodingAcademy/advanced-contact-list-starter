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
