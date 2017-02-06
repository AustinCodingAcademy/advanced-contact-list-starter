import React, { Component } from 'react';

class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: '',
    }
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
  }

  render() {
    return (
      <form className="new-contact-form" onSubmit={this.handleSubmit.bind(this)}>
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
          disabled={
            !this.state.name.trim() ||
            !this.state.occupation.trim() ||
            !this.state.avatar.trim()
          }
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default ContactForm;
