import React, { Component } from 'react';

class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: ''
    };
  }

  handleInputChange(event) {
    // Method to handle change event for the different form inputs
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Gets all of the values from state and passes them to an
    // onSubmit callback in props
    const { name, avatar, occupation } = this.state;
    this.props.onSubmit({ name, avatar, occupation });

    this.setState({
      // Clears out the form fields when the form is submitted
      name: '',
      avatar: '',
      occupation: ''
    });
  }

  render() {
    return (
      <form
        className="new-contact-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
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
          value="+ Add New"
          // Disables the submit input if the values in state are empty.
          // Using .trim method on strings to remove and white space, and
          // ensure there is some value and not just an empty string
          disabled={!this.state.name.trim() ||
                    !this.state.occupation.trim() ||
                    !this.state.avatar.trim()}
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default ContactForm;
