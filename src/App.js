import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import uuid from 'node-uuid';

import SearchBarContainer from './containers/SearchBarContainer';
import ContactList from './components/ContactList';
import SelectedContactList from './components/SelectedContactList';
import ResetButton from './components/ResetButton';
import ContactForm from './components/ContactForm';
import ActionHistoryList from './components/ActionHistoryList';


/* eslint-disable max-len */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedContacts: [],
      actionHistory: [],
      originalState: {}
    };
  }

  componentDidMount() {
    this.props.onContactsLoad();
    /* axios.get('http://localhost:3001/actionHistory')
      .then(resp => {
        this.setState({
          actionHistory: resp.data
        });
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });*/
  }

  handleSelectContact(contact) {
    const newSelectedContact = [
      ...this.state.selectedContacts,
      contact
    ];

    const newContactsArray = this.props.contacts.filter(contactSelected => contactSelected !== contact);

    this.setState({
      selectedContacts: newSelectedContact,
      contacts: newContactsArray
    });

    this.addAction('select', contact);
  }

  handleUnselectContact(contact) {
    const newSelectedContact = [
      ...this.props.contacts,
      contact
    ];

    const newSelectedContactsArray = this.state.selectedContacts.filter(contactSelected => contactSelected !== contact);

    this.setState({
      contacts: newSelectedContact,
      selectedContacts: newSelectedContactsArray
    });

    this.addAction('unselect', contact);
  }

  resetContacts() {
    this.setState(this.state.originalState);
    this.addAction('reset');
  }

  handleSubmitContact(attributes) {
    axios.post('http://localhost:3001/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.props.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));

    this.addAction('submit');
  }

  getFilteredContacts() {
    // removes any white space before what the user searches for and makes the input all lowercase
    const search = this.props.searchText.trim().toLowerCase();

    // this returns the filtered text the user inputs in the search bar
    return this.props.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(search) >= 0;
    });
  }

  handleRemoveContact(_id) {
    axios.delete(`http://localhost:3001/contacts/${_id}`)
      .then(() => {
        this.setState({
          contacts: this.props.contacts.filter(contact => contact._id !== _id)
        });
      })
      .catch(err => console.log(err));
  }

  handleRemoveAction(_id) {
    axios.delete(`http://localhost:3001/actionHistory/${_id}`)
      .then(() => {
        this.setState({
          actionHistory: this.state.actionHistory.filter(action => action._id !== _id)
        });
      })
      .catch(err => console.log(err));
  }

  addAction(actionType, contact, attributes) {

    let actionMessage = '';

    switch (actionType) {
      case 'select':
        actionMessage = `You have selected ${contact.name}`;
        break;
      case 'unselect':
        actionMessage = `You have unselected ${contact.name}`;
        break;
      case 'remove':
        actionMessage = `You have removed ${contact.name}`;
        break;
      case 'submit':
        actionMessage = 'You have created a new contact';
        break;
      case 'reset':
        actionMessage = 'You have reseted the app';
        break;
      default:
        actionMessage = 'I must have forgot somthing';
    }

    const newAction = this.buildNewAction(actionMessage);

    const newHistory = [...this.state.actionHistory, newAction];

    axios.post('http://localhost:3001/actionHistory', attributes)
      .then(() => {
        this.setState({
          actionHistory: newHistory
        });
      })
      .catch(err => console.log(err));
  }

  buildNewAction(description) {
    return {
      actionMessage: description,
      _id: uuid.v4()
    };
  }

  render() {
    return (
      <div className="App">
        <h1>
          Contact List!
        </h1>
        <ContactForm onSubmit={this.handleSubmitContact.bind(this)} />
        <h2>Search</h2>
        <SearchBarContainer />
        <ResetButton
          onResetClick={this.resetContacts.bind(this)}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          onRemoveContact={this.handleRemoveContact.bind(this)}
          onSelectContact={this.handleSelectContact.bind(this)}
          searchText={this.state.searchText}
        />
        <SelectedContactList
          selectedContacts={this.state.selectedContacts}
          onUnselectContact={this.handleUnselectContact.bind(this)}
        />
        <ActionHistoryList
          onRemoveAction={this.handleRemoveAction.bind(this)}
          actions={this.state.actionHistory}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onContactsLoad: PropTypes.func.isRequired
};

export default App;
