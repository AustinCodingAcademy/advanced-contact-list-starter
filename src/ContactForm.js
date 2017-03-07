import React, { Component } from 'react';

class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: '',
    };
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    const {name, avatar, occupation} = this.state;
    this.props.onSubmit({name, avatar, occupation});
    this.setState({
      name: '',
      occupation: '',
      avatar: ''
    });
  }

  render() {
    return (
      <form className="new-contact-form" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
        />
        <input
          type="text"
          placeholder="Occupation"
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleInputChange.bind(this)}
        />
        <input
          type="text"
          placeholder="Avatar"
          name="avatar"
          value={this.state.avatar}
          onChange={this.handleInputChange.bind(this)}
        />
        <input
          type="submit"
          value="+ Add New Contact"
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
