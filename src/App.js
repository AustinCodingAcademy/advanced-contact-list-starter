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
      validationErrors: {},
      contacts: [],
      selectedContacts: [],
      backupContacts: [],
      actionHistory: [],
    };
  }

  componentDidMount() {

    this.getContacts();
    this.getSelectedContacts();
    setInterval(this.removeStaleActionHistory.bind(this), 5000);
  }

  buildBackup() {
    // build a backup of contacts to enable resetting
    this.setState({
      backupContacts: Object.assign([], this.state.contacts)
    });

  }

  /*
   Add Contact Input Form
   */

  handleAddContactSubmit(evt) {

    const isFormSubmit = true;
    const validationErrors = this.validate(this.state.contact);

    this.setState({validationErrors});

    evt.preventDefault();

    if (Object.keys(validationErrors).length) {
      return;
    }

    this.addAvailableContact(this.state.contact, isFormSubmit);
  }


  validate(contact) {
    const errors = {};
    if (!contact.name) {
      errors.name = 'Name required';
    }
    if (!contact.occupation) {
      errors.occupation = 'Occupation required';
    }
    if (!contact.avatar) {
      errors.avatar = 'Avatar link required';
    }
    return errors;
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
  }

  /*
   Search Bar
   */

  handleSearchBarChange(event) {

    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts(contactsArray) {

    const searchTerm = this.state.searchText.trim().toLowerCase();

    return contactsArray.filter(contact => {
      return contact.name.toLowerCase().indexOf(searchTerm) >= 0;
    });

  }

  /*
   Selected Contacts
   */

  getSelectedContacts() {
    axios.get('http://localhost:4000/selectedContacts/')
        .then((resp) => {
          this.setState({
            selectedContacts: resp.data
          });
        })
        .catch(err => console.log(err));
  }

  handleAddToSelectedClick(contact) {

    this.addSelectedContact(contact);
    this.removeAvailableContact(contact._id);

    this.addActionToHistory(`Added ${contact.name} to selected contacts`);
  }

  addSelectedContact(contact) {

    axios.post('http://localhost:4000/selectedContacts/', contact)
        .then((resp) => {
          this.setState({
            selectedContacts: this.state.selectedContacts.concat(resp.data)
          });
        })
        .catch(err => console.log(err));

  }

  handleRemoveSelectedClick(contact) {

    const id = contact._id;

    this.addAvailableContact(contact);
    this.removeSelectedContact(id);

    this.addActionToHistory(`Removed ${contact.name} from selected contacts`);

  }

  removeSelectedContact(id) {

    axios.delete(`http://localhost:4000/selectedContacts/${id}`)
        .then(() => {
          this.setState({
            selectedContacts: this.state.selectedContacts.filter((contact) => {
              return contact._id !== id;
            })
          });
        }).catch(err => console.log(err));
  }

  /*
   Available Contacts
   */

  getContacts() {

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

  addAvailableContact(contact, isFormSubmit) {

    axios.post('http://localhost:4000/contacts/', contact)
        .then((resp) => {
          this.setState({
            contacts: this.state.contacts.concat(resp.data),
            contact: isFormSubmit ? this.getEmptyContact() : Object.assign({}, this.state.contact)
          });
        }).catch(err => console.log(err));

  }

  removeAvailableContact(id) {

    axios.delete(`http://localhost:4000/contacts/${id}`)
        .then(() => {
          this.setState({
            contacts: this.state.contacts.filter((contact) => {
              return contact._id !== id;
            })
          });
        }).catch(err => console.log(err));
  }


  /*
   Reset Button
   */

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

  /*
  Action History
  */

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
          validationErrors={this.state.validationErrors}
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
