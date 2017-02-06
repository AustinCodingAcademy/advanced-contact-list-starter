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

  constructor() {
    super();

    this.state = {
      open: false,
    };
  }

  /*
   Add Contact Input Form
   */

  handleAddContactSubmit(evt) {

    const isFormSubmit = true;
    const validationErrors = this.constructor.validateInputForm(this.state.contact);

    this.setState({validationErrors});

    evt.preventDefault();

    if (Object.keys(validationErrors).length) {
      return;
    }

    this.addAvailableContact(this.state.contact, isFormSubmit);
  }


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

  onInputChange(evt) {
    const contact = this.state.contact;
    contact[evt.target.name] = evt.target.value;
    this.setState({contact});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
          label="Cancel"
          key="1"
          primary
          onTouchTap={this.handleClose}
      />,
      <FlatButton
          label="Submit"
          key="2"
          primary
          keyboardFocused
          onTouchTap={this.handleClose}
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
          <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
          >

            <ContactForm contact={this.props.state} handleAddContactSubmit={this.props.handleAddContactSubmit}
                         onInputChange={this.props.contact} handleFormClose={this.props.handleAddContactSubmit}/>
          </Dialog>
        </div>
    );
  }

}
