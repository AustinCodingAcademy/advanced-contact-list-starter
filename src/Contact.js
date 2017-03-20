import React, { PropTypes, Component } from 'react';
import Highlight from './Highlight';

class Contact extends Component {
  render() {
    return (
      <li className="contact">
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="contact-info" name={this.props.name}>
          <Highlight
            name={this.props.name}
            search={this.props.search}
          />
          {this.props.occupation}
        </div>
        <div>
          <button onClick={this.props.onButtonClick}>Add</button>
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
  active: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonType: PropTypes.string,
  search: PropTypes.string
};
