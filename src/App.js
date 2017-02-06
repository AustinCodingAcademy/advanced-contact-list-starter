import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import ContactList from './ContactList';
import SelectedContactList from './SelectedContactList';
import ResetButton from './ResetButton';
import ContactForm from './ContactForm';
import ActionHistoryList from './ActionHistoryList';


/* eslint-disable max-len */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [],
      selectedContacts: [],
      actionHistory: [],
      actionId: 100,
      originalState: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data,
          originalState: {
            searchText: '',
            contacts: resp.data,
            selectedContacts: []
          }
        });
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSelectContact(contact) {
    const newSelectedContact = [
      ...this.state.selectedContacts,
      contact
    ];

    const newContactsArray = this.state.contacts.filter(contactSelected => contactSelected !== contact);

    this.setState({
      selectedContacts: newSelectedContact,
      contacts: newContactsArray
    });

    this.addAction('select');
  }

  handleUnselectContact(selectedContact) {
    const newSelectedContact = [
      ...this.state.contacts,
      selectedContact
    ];

    const newSelectedContactsArray = this.state.selectedContacts.filter(contactSelected => contactSelected !== selectedContact);

    this.setState({
      contacts: newSelectedContact,
      selectedContacts: newSelectedContactsArray
    });

    this.addAction('unselect');
  }

  resetContacts() {
    this.setState(this.state.originalState);
    this.addAction('reset');
  }

  handleSubmitContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));

    this.addAction('submit');
  }

  getFilteredContacts() {
    // removes any white space before what the user searches for and makes the input all lowercase
    const search = this.state.searchText.trim().toLowerCase();

    // this returns the filtered text the user inputs in the search bar
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(search) >= 0;
    });
  }

  handleRemoveContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(() => {
        this.setState({
          contacts: this.state.contacts.filter(contact => contact._id !== _id)
        });
      })
      .catch(err => console.log(err));
  }

  handleRemoveAction(_id) {
    this.setState({
      actionHistory: this.state.actionHistory.filter(action => action._id !== _id)
    });
  }

  addAction(actionType) {
    const name = this.state.originalState.contacts.name;
    const newId = this.state.actionId + 1;

    let actionMessage = '';

    switch (actionType) {
      case 'select':
        actionMessage = `You have selected ${name}`;
        break;
      case 'unselect':
        actionMessage = `You have unselected ${name}`;
        break;
      case 'remove':
        actionMessage = `You have removed ${name}`;
        break;
      case 'reset':
        actionMessage = 'You have reseted the app';
        break;
      default:
        actionMessage = 'I must have forgot somthing';
    }

    const newHistory = [...this.state.actionHistory, actionMessage];

    this.setState({
      actionHistory: newHistory,
      _id: newId
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Contact List!
        </h1>
        <ContactForm onSubmit={this.handleSubmitContact.bind(this)} />
        <h2>Search</h2>
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
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

export default App;
