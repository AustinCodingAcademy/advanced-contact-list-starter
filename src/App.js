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
      contact: this.buildNewContact(),
      validationErrors: {},
      contacts: [],
      selectedContacts: [],
      backupContacts: [],
      actionHistory: [],
    };

    // Done in constructor instead of in onEvent(s) for performance,
    // if passed in the bind will be redone every render?
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleAddContactSubmit = this.handleAddContactSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleRemoveActionFromHistoryClick = this.handleRemoveActionFromHistoryClick.bind(this);
    this.handleRemoveSelectedClick = this.handleRemoveSelectedClick.bind(this);
    this.handleAddToSelectedClick = this.handleAddToSelectedClick.bind(this);
    this.removeStaleActionHistory = this.removeStaleActionHistory.bind(this);

  }

  componentDidMount() {

    this.getContacts();
    this.getSelectedContacts();
    setInterval(this.removeStaleActionHistory, 5000);
  }


  /*
   Add Contact Input Form
   */

  handleAddContactSubmit(evt) {

    const isFormSubmit = true;
    const validationErrors = this.validateInputForm(this.state.contact);

    this.setState({validationErrors});

    evt.preventDefault();

    if (Object.keys(validationErrors).length) {
      return;
    }

    this.addAvailableContact(this.state.contact, isFormSubmit);
  }


  validateInputForm(contact) {
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

  buildNewContact() {
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

    axios.get('http://localhost:4000/selectedContacts')
        .then((response) => {
          this.setState({
            selectedContacts: response.data
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

    return axios.get('http://localhost:4000/contacts')
        .then((response) => {

          this.setState({
            contacts: response.data
          });

        }).catch((err) => {
          console.log(err);
        });
  }

  addAvailableContact(contact, isFormSubmit) {

    axios.post('http://localhost:4000/contacts/', contact)
        .then((resp) => {
          this.setState({
            contacts: this.state.contacts.concat(resp.data),
            contact: isFormSubmit ? this.buildNewContact() : Object.assign({}, this.state.contact)
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

  static batchableRemoveSelectedContact(id) {
    return axios.delete(`http://localhost:4000/selectedContacts/${id}`);
  }

  static batchableAddAvailableContact(contact) {
    return axios.post('http://localhost:4000/contacts/', contact);
  }

  /* eslint-disable max-len */
  resetApplicationState() {

    // These parrallel promises are sometimes buggy it seems with the Json server
    // on a normal server this could be done in a single promise by sending back an object containing the contacts
    // and Id's.
    // Not a race condition because the batchableRemoves/batchableAdds don't modify state
    axios.all(this.state.selectedContacts.map(selectedContact => this.constructor.batchableAddAvailableContact(selectedContact)),
        this.state.selectedContacts.map(selectedContact => this.constructor.batchableRemoveSelectedContact(selectedContact._id)))
        .then(() => {
          this.getContacts();
          this.getSelectedContacts();
        })
        .catch(err => console.log(err));
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

    const newAction = this.constructor.buildNewAction(description);

    // Using immutability helper to return new array.
    const newState = update(this.state.actionHistory, {$unshift: [newAction]});

    this.setState({
      actionHistory: newState.slice(0, 9)
    });

  }

  handleRemoveActionFromHistoryClick(id) {

    this.setState({
      actionHistory: this.state.actionHistory.filter((action) => {
        return action._id !== id;
      })
    });

  }

  static buildNewAction(description) {

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
          onChange={this.handleSearchBarChange} />
        <AddContactForm
          handleAddContactSubmit={this.handleAddContactSubmit}
          contact={this.state.contact}
          validationErrors={this.state.validationErrors}
          onNameChange={this.onInputChange}
          />
        <button
          className="reset-button"
          onClick={this.handleResetClick}
          >Reset
          </button>
        <ActionHistory
          actions={this.state.actionHistory}
          removeAction={this.handleRemoveActionFromHistoryClick}
          />
        <ContactList
          value={this.state.searchText}
          title={this.state.selectedContacts.length > 0 ? 'Selected Contacts' :
                  'No selected contacts'}
          contacts={this.getFilteredContacts(this.state.selectedContacts)}
          handleSelectContactClick={this.handleRemoveSelectedClick}
          />
        <ContactList
          value={this.state.searchText}
          title={'Available Contacts'}
          contacts={this.getFilteredContacts(this.state.contacts)}
          handleSelectContactClick={this.handleAddToSelectedClick}
          />

      </div>
    );
  }

}

export default App;
