import React, {Component} from 'react';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import ContactCard from './ContactCard';
import TextField from 'material-ui/TextField';

// TODO: Question about how to get the click handler to work for entire
// todo: left side of card but not the buttons.
// Todo: clean this contact list up and break out components
class ContactList extends Component {

  render() {
    return (
      <Paper className="paper">
        <TextField
          placeholder="Search Contacts"
          name="searchQuery"
          onChange={(evt) => this.props.handleSearchBarChange(evt)}
      />

        <Divider />
        <h4>Selected</h4>

        {this.props.contacts.filter(contact => contact.selected).map((contact) => {
          return (
            <ContactCard
              key={contact._id}
              contact={contact}
              searchWords={this.props.value}
              activeContactId={this.props.activeContactId}
              handleSelectContactClick={this.props.handleSelectContactClick}
              handleRemoveSelectedClick={this.props.handleRemoveSelectedClick}
              handleDeleteContactClick={this.props.handleDeleteContactClick}
            />
          );
        })}
        <Divider />
        <h4>Available</h4>

        {this.props.contacts.filter(contact => !contact.selected).map((contact) => {
          return (
            <ContactCard
              key={contact._id}
              contact={contact}
              searchWords={this.props.value}
              activeContactId={this.props.activeContactId}
              handleSelectContactClick={this.props.handleSelectContactClick}
              handleRemoveSelectedClick={this.props.handleRemoveSelectedClick}
              handleDeleteContactClick={this.props.handleDeleteContactClick}
            />

          );
        })}
      </Paper>
    );
  }



}

ContactList.propTypes = {
  title: React.PropTypes.string.isRequired,
  contacts: React.PropTypes.array.isRequired,
  activeContactId: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  handleSelectContactClick: React.PropTypes.func.isRequired,
  handleDeleteContactClick: React.PropTypes.func.isRequired,
  handleRemoveSelectedClick: React.PropTypes.func.isRequired,
  handleSearchBarChange: React.PropTypes.func.isRequired
};

export default ContactList;
