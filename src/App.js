import React, {Component} from 'react';
import uuid from 'uuid';
import update from 'immutability-helper';
import moment from 'moment';
import axios from 'axios';

import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ActionHistory from './ActionHistory';
import AddContactForm from './AddContactForm';


class App extends Component {

  constructor() {

    super();

    this.state = {
      searchText: '',
      contact: this.getEmptyContact(),
      contacts: [],
      selectedContacts: [],
      backupContacts: [],
      actionHistory: [],
    };
  }

  componentDidMount() {

    this.getContacts();
    setInterval(this.removeStaleActionHistory.bind(this), 5000);
  }

  getContacts() {

    console.log('get contacts ran');
    axios.get('http://localhost:4000/contacts')
        .then((response) => {

          this.setState({
            contacts: response.data
          });

          this.buildBackup();

        }).catch((err) => {
          console.log(err);
        });
  }


  removeStaleActionHistory() {

    if (this.state.actionHistory.length > 0) {
      const now = moment();

      this.setState({
        actionHistory: this.state.actionHistory.filter((action) => {
          return action.expirationMoment.isAfter(now);
        })
      });
    }

  }

  buildBackup() {
    // build a backup of contacts to enable resetting
    this.setState({
      backupContacts: Object.assign([], this.state.contacts)
    });

  }

  handleAddContactSubmit(evt) {

    evt.preventDefault();
    const contacts = [ ...this.state.contacts, this.state.contact];

    this.setState({
      contacts,
      contact: this.getEmptyContact()
    });

  }

  getEmptyContact() {
    return {
      _id: uuid.v4(),
      name: '',
      occupation: '',
      avatar: ''
    };
  }

  onInputChange(evt) {
    const contact = this.state.contact;
    contact[evt.target.name] = evt.target.value;
    this.setState({contact});

    console.log('After being set on input change');
    console.log(this.state.contact);
  }

  handleSearchBarChange(event) {

    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts(contactsArray) {

    console.log(this.state.contacts);

    const searchTerm = this.state.searchText.trim().toLowerCase();

    return contactsArray.filter(contact => {
      return contact.name.toLowerCase().indexOf(searchTerm) >= 0;
    });

  }

  handleAddToSelectedClick(event) {

    const id = event.target.id;

    this.addSelectedContact(id);
    this.removeAvailableContact(id);

    const addedContact = this.findContactById(id, this.state.contacts);
    this.addActionToHistory(`Added ${addedContact.name} to selected contacts`);
  }

  handleRemoveSelectedClick(event) {

    const id = event.target.id;

    this.addAvailableContact(id);
    this.removeSelectedContact(id);

    const removedContact = this.findContactById(id, this.state.selectedContacts);
    this.addActionToHistory(`Removed ${removedContact.name} from selected contacts`);

  }

  addSelectedContact(id) {

    const contact = this.findContactById(id, this.state.contacts);

    this.setState({
      selectedContacts: this.state.selectedContacts.concat(contact)
    });

    return contact;
  }

  removeSelectedContact(id) {

    this.setState({
      selectedContacts: this.state.selectedContacts.filter((contact) => {
        return contact._id !== id;
      })
    });
  }

  addAvailableContact(id) {

    const contact = this.findContactById(id, this.state.selectedContacts);

    this.setState({
      contacts: this.state.contacts.concat(contact)
    });

    return contact;
  }

  removeAvailableContact(id) {

    this.setState({
      contacts: this.state.contacts.filter((contact) => {
        return contact._id !== id;
      })
    });

  }

  findContactById(id, array) {

    return array.find((contact) => {
      return contact._id === id;
    });
  }

  handleResetClick() {

    this.resetApplicationState();
    this.addActionToHistory('Reset application');
  }

  resetApplicationState() {

    this.setState({
      contacts: Object.assign([], this.state.backupContacts),
      selectedContacts: [],
      searchText: '',
      actionHistory: []
    });
  }

  addActionToHistory(description) {

    const newAction = this.buildNewAction(description);

    // Using immutability helper to return new array.
    const newState = update(this.state.actionHistory, {$unshift: [newAction]});

    this.setState({
      actionHistory: newState.slice(0, 9)
    });

  }

  handleRemoveActionFromHistoryClick(event, id) {

    this.setState({
      actionHistory: this.state.actionHistory.filter((action) => {
        return action._id !== id;
      })
    });

  }

  buildNewAction(description) {

    const action = {
      description: description || 'A default action',
      _id: uuid.v4(),
      expirationMoment: moment().add(60, 's')
    };

    return action;
  }

  render() {

    return (
      <div className="App">
        <SearchBar value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)} />
        <AddContactForm
          handleAddContactSubmit={this.handleAddContactSubmit.bind(this)}
          contact={this.state.contact}
          onNameChange={this.onInputChange.bind(this)}
          />
        <button
          className="reset-button"
          onClick={this.handleResetClick.bind(this)}
          >Reset
          </button>
        <ActionHistory
          actions={this.state.actionHistory}
          removeAction={this.handleRemoveActionFromHistoryClick.bind(this)}
          />
        <ContactList
          value={this.state.searchText}
          title={this.state.selectedContacts.length > 0 ? 'Selected Contacts' :
                  'No selected contacts'}
          contacts={this.getFilteredContacts(this.state.selectedContacts)}
          handleSelectContactClick={this.handleRemoveSelectedClick.bind(this)}
          />
        <ContactList
          value={this.state.searchText}
          title={'Available Contacts'}
          contacts={this.getFilteredContacts(this.state.contacts)}
          handleSelectContactClick={this.handleAddToSelectedClick.bind(this)}
          />

      </div>
    );
  }

}

export default App;
