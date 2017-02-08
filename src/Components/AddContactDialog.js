/**
 * Created by brianmichael on 2/6/17.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContactForm from './ContactForm';

export default class AddContactDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleCancel = () => {
    this.setState({
      open: false
    });
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
