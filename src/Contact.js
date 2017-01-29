import React, { PropTypes, Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <li className="contact"
        onClick={() => this.props.onChange(this.props.name)}>
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="contact-info" name={this.props.name}>
          <h2>{this.props.name}</h2>
          {this.props.occupation}
        </div>
      </li>
    );
  }
}

export default Contact;

Contact.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  occupation: PropTypes.string,
  onChange: PropTypes.func,
};
