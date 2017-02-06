/**
 * Created by brianmichael on 2/6/17.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import ContactForm from './ContactForm';

export default class AddContactDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  /*
   Add Contact Input Form
   */

  // handleAddContactSubmit(evt) {
  //
  //   const isFormSubmit = true;
  //   const validationErrors = this.constructor.validateInputForm(this.state.contact);
  //
  //   this.setState({validationErrors});
  //
  //   evt.preventDefault();
  //
  //   if (Object.keys(validationErrors).length) {
  //     return;
  //   }
  //
  //   this.addAvailableContact(this.state.contact, isFormSubmit);
  // }


  // static validateInputForm(contact) {
  //   const errors = {};
  //   if (!contact.name) {
  //     errors.name = 'Name required';
  //   }
  //   if (!contact.occupation) {
  //     errors.occupation = 'Occupation required';
  //   }
  //   if (!contact.avatar) {
  //     errors.avatar = 'Avatar link required';
  //   }
  //   return errors;
  // }

  // static buildNewContact() {
  //   return {
  //     _id: uuid.v4(),
  //     name: '',
  //     occupation: '',
  //     avatar: '',
  //     selected: false
  //   };
  // }

  // onInputChange(evt) {
  //   const contact = this.state.contact;
  //   contact[evt.target.name] = evt.target.value;
  //   this.setState({contact});
  // }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleCancel = () => {
    this.setState({
      open: false
    })
  };

  handleSubmit = (evt) => {
    this.props.handleAddContactSubmit(evt);
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        key="1"
        primary
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        key="2"
        primary
        keyboardFocused
        onTouchTap={(evt) => this.handleSubmit(evt)}
      />,
    ];

    return (
      <div>
        <FloatingActionButton
          className="fab-button"
          onTouchTap={this.handleOpen}
          label="Dialog"
          >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog className="contact-form"
          title="Add a contact"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleCancel}
          >

          <ContactForm
            contact={this.props.contact}
            onInputChange={this.props.onInputChange}
            validationErrors={this.props.validationErrors}
            />
        </Dialog>
      </div>
    );
  }

}

AddContactDialog.propTypes = {
  contact: React.PropTypes.object.isRequired,
  handleAddContactSubmit: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
  validationErrors: React.PropTypes.object.isRequired
};
