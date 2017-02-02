/**
	* Created by brianmichael on 1/23/17.
	*/
import React, {Component} from 'react';
import Highlighter from './Highlighter';

class Contact extends Component {

  render() {
    return (
      <li
        className="contact"
								>
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>
            <Highlighter searchWords={this.props.value} textToHighlight={this.props.name} />
          </h2>
          <h3>{this.props.occupation}</h3>
        </div>

        <button
          className="select-button"
          id={this.props.id}
          onClick={(event) => this.props.handleSelectContactClick(event)}>Select
										</button>
      </li>
    );
  }
}

Contact.propTypes = {
  avatar: React.propTypes.string,
  value: React.propTypes.string,
  name: React.propTypes.string,
  occupation: React.propTypes.string,
  id: React.propTypes.string,
  handleSelectContactClick: React.propTypes.function
};

export default Contact;
