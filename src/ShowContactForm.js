import React, { Component } from 'react';
import ContactForm from './ContactForm';

class ShowContactForm extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);

  }

  handleFormOpen() {
    this.setState({
      open: true
    });
  }

  handleFormClose() {
    this.setState({
      open: false
    });
  }

  render() {
    if (this.state.open) {
      return (
        <ContactForm
          contact={this.props.contact}
          handleAddContact={this.props.handleAddContact}
          handleInputChange={this.props.handleInputChange}
        />
      );
    }

    return (
      <div>
        <button id="add-button" onClick={this.handleFormOpen}>Add a New Contact</button>
      </div>
    );
  }
}

ShowContactForm.propTypes = {
  contact: React.PropTypes.array.isRequired,
  handleAddContact: React.PropTypes.func.isRequired,
  handleInputChange: React.PropTypes.func.isRequired
};

export default ShowContactForm;
