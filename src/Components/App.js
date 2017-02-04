import React, {Component} from 'react';
import uuid from 'uuid';
import update from 'immutability-helper';
import moment from 'moment';
import axios from 'axios';

import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ActionHistory from './ActionHistory';
import ToggleableContactForm from './ToggleableContactForm';
import LoadingSpinner from './LoadingSpinner';
import ErrorHistory from './ErrorHistory';


class App extends Component {

  constructor() {

    super();

    this.state = {
      searchText: '',
      contact: this.constructor.buildNewContact(),
      validationErrors: {},
      contacts: [],
      selectedContacts: [],
      backupContacts: [],
      actionHistory: [],
      errorHistory: [],
      isLoading: false,
      activeContactId: ''
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
    this.handleDeleteContactClick = this.handleDeleteContactClick.bind(this);

  }


  componentDidMount() {

    this.getContacts();
    this.getSelectedContacts();

    this.registerInterceptors();

    setInterval(() => {
      this.removeStaleActionHistory();
      this.removeStaleErrorHistory();
    }, 5000);
  }

  /*
   Delete Button
   */

  handleDeleteContactClick(id, listTitle) {
    this.deleteContact(id, listTitle);
  }

  deleteContact(id, listTitle) {

    this.setActiveContactId(id);

    if (listTitle === 'Available Contacts') {
      this.removeAvailableContact(id);
    } else {
      this.removeSelectedContact(id);
    }

    this.addActionToHistory('Deleted a contact');

  }

  setActiveContactId(id) {
    this.setState({
      activeContactId: id
    });
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


  static validateInputForm(contact) {
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

  static buildNewContact() {
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


    this.loadingStarted();

    axios.get('http://localhost:4000/selectedContacts')
        .then((response) => {

          this.loadingEnded();

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

    this.loadingStarted();

    axios.post('http://localhost:4000/selectedContacts/', contact)
        .then((resp) => {

          this.loadingEnded();

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

    this.loadingStarted();

    axios.delete(`http://localhost:4000/selectedContacts/${id}`)
        .then(() => {

          this.loadingEnded();

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

    this.loadingStarted();

    return axios.get('http://localhost:4000/contacts')
        .then((response) => {

          this.loadingEnded();

          console.log('getting available contacts');
          console.log(response.data);

          this.setState({
            contacts: response.data
          });

        }).catch((err) => {
          console.log(err);
        });
  }

  addAvailableContact(contact, isFormSubmit) {

    this.loadingStarted();

    axios.post('http://localhost:4000/contacts/', contact)
        .then((resp) => {

          this.loadingEnded();
          this.setState({
            contacts: this.state.contacts.concat(resp.data),
            contact: isFormSubmit ? this.constructor.buildNewContact() :
                Object.assign({}, this.state.contact)
          });
        }).catch(err => console.log(err));

  }

  removeAvailableContact(id) {

    this.loadingStarted();

    axios.delete(`http://localhost:4000/contacts/${id}`)
        .then(() => {
          this.loadingEnded();

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
    return axios.post('http://localhost:4000/contacts', contact);
  }

  /* eslint-disable max-len */
  resetApplicationState() {

    // These parallel promises are sometimes buggy it seems with the Json server
    // on a normal server this could be done in a single promise by sending back an object containing the contacts
    // and Id's.

    const deletes = this.state.selectedContacts.map(selectedContact =>
        this.constructor.batchableRemoveSelectedContact(selectedContact._id));
    const adds = this.state.selectedContacts.map(selectedContact =>
        this.constructor.batchableAddAvailableContact(selectedContact));

    this.loadingStarted();

    axios.all(deletes)
        .then(() => {
          axios.all(adds);
        }).then(() => {
          this.getSelectedContacts();
          this.getContacts();
        })
        .then(() => {
          this.loadingEnded();
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

    return {
      description: description || 'A default action',
      _id: uuid.v4(),
      expirationMoment: moment().add(25, 's')
    };
  }

  /*
   Http Interceptors
   */

  registerInterceptors() {

    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {

      this.addErrorToHistory(error);

      return Promise.reject(error);
    });
  }

  /*
   Error History
   */


  removeStaleErrorHistory() {

    if (this.state.errorHistory.length > 0) {
      const now = moment();

      this.setState({
        errorHistory: this.state.errorHistory.filter((error) => {
          return error.expirationMoment.isAfter(now);
        })
      });
    }

  }

  addErrorToHistory(error) {

    const newError = this.constructor.buildNewError(error);

    const newState = update(this.state.errorHistory, {$unshift: [newError]});

    this.setState({
      errorHistory: newState.slice(0, 14)
    });

    console.log(this.state.errorHistory);

  }

  static buildNewError(error) {

    return {
      message: error.message,
      data: error.data,
      _id: uuid.v4(),
      expirationMoment: moment().add(15, 's')
    };

  }


  /*
   Loading Spinner
   */

  loadingStarted() {
    this.setState({
      isLoading: true,
    });
  }

  loadingEnded() {
    this.setState({
      isLoading: false,
    });

  }


  render() {

    return (
      <div className="App">

        <LoadingSpinner isLoading={this.state.isLoading} />
        <SearchBar value={this.state.searchText}
          onChange={this.handleSearchBarChange} />
        <ToggleableContactForm
          handleAddContactSubmit={this.handleAddContactSubmit}
          contact={this.state.contact}
          validationErrors={this.state.validationErrors}
          onInputChange={this.onInputChange} />
        <button
          className="reset-button"
          onClick={this.handleResetClick}
          >Reset
          </button>
        <ActionHistory
          actions={this.state.actionHistory}
          removeAction={this.handleRemoveActionFromHistoryClick}
          />
        <ErrorHistory errors={this.state.errorHistory} />
        <ContactList
          value={this.state.searchText}
          title={this.state.selectedContacts.length > 0 ? 'Selected Contacts' :
                  'No selected contacts'}
          contacts={this.getFilteredContacts(this.state.selectedContacts)}
          handleSelectContactClick={this.handleRemoveSelectedClick}
          handleDeleteContactClick={this.handleDeleteContactClick}
          activeContactId={this.state.activeContactId}
          />
        <ContactList
          value={this.state.searchText}
          title={'Available Contacts'}
          contacts={this.getFilteredContacts(this.state.contacts)}
          handleSelectContactClick={this.handleAddToSelectedClick}
          handleDeleteContactClick={this.handleDeleteContactClick}
          activeContactId={this.state.activeContactId}
          />

      </div>
    );
  }

}

export default App;
