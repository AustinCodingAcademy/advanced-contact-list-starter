/**
 * Created by brianmichael on 2/3/17.
 */
import React, {Component} from 'react';
import ContactForm from './ContactForm';

class ToggleableContactForm extends Component {

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);

  }

  handleFormOpen() {
    this.setState({
      isOpen: true
    });
  }

  handleFormClose() {
    this.setState({
      isOpen: false
    });
  }


  render() {

    if (this.state.isOpen) {
      return (
        <ContactForm
          contact={this.props.contact}
          handleAddContactSubmit={this.props.handleAddContactSubmit}
          onInputChange={this.props.onInputChange}
          validationErrors={this.props.validationErrors}
          handleFormClose={this.handleFormClose}
           />
      );
    } 
    return (
      <button onClick={this.handleFormOpen}>
        <i className="fa fa-plus" aria-hidden="true" />
      </button>
    );
    
  }

}

ToggleableContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  handleAddContactSubmit: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  validationErrors: React.PropTypes.object.isRequired
};

export default ToggleableContactForm;
