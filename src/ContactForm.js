import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: '',
      showContactForm: false
    };
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleOccupationChange(event) {
    this.setState({
      occupation: event.target.value
    });
  }

  handleAvatarChange(event) {
    this.setState({
      avatar: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, avatar, occupation } = this.state;
    this.props.onSubmit({ name, avatar, occupation });
    const bool = this.state.showContactForm !== true;
    this.setState({
      showContactForm: bool
    });
  }

  showHideContactForm() {

    const bool = this.state.showContactForm !== true;

    this.setState({
      showContactForm: bool
    });

  }
  render() {
    return (
      <div>
        <button
          onClick={() => this.showHideContactForm()}
          style={{display: this.state.showContactForm ? 'none' : ''}}
          >Add Contact</button>
        <form
          className="new-contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          style={{display: this.state.showContactForm ? 'block' : 'none'}}
          >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />

          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={this.state.occupation}
            onChange={this.handleOccupationChange.bind(this)}
          />

          <label htmlFor="avatar">Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={this.state.avatar}
            onChange={this.handleAvatarChange.bind(this)}
          />
          <input
            type="submit"
            value="+ Add New"
            disabled={!this.state.name.trim() ||
              !this.state.occupation.trim() ||
              !this.state.avatar.trim()}
          />
        </form>
      </div>
    );
  }

}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
