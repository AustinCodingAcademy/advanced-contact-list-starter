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

  // Method to handle change event for the different form inputs
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //  Method for submit event.
  //  gets the value in state and passes to onSubmit call back in props.
  handleSubmit(event) {
    event.preventDefault();

    const { name, avatar, occupation } = this.state;
    this.props.handleAddContact({ name, avatar, occupation });
    //  passed handleReset(); within this method.
    this.handleReset();
  }

  //  clears the fields after the form is submitted.
  handleReset() {
    this.setState({
      name: '',
      avatar: '',
      occupation: ''
    });
  }


  render() {
    return (
      <div>
        <button id="close-button" onClick={this.handleFormOpen}>Close</button>
        <form className="new-contact-form" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)}
        />

          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={this.state.occupation}
            onChange={this.handleInputChange.bind(this)}
          />

          <label htmlFor="Avatar">Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={this.state.avatar}
            onChange={this.handleInputChange.bind(this)}
          />

          <input
            type="submit"
            value="+ Add New"
            // Disables the submit input if the values in state are empty.
            // Uses .trim method on strings to remove white space.
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
  handleAddContact: React.PropTypes.func.isRequired
};

export default ContactForm;
