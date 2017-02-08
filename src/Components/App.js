import React, {Component} from 'react';
import uuid from 'uuid';
import update from 'immutability-helper';
import moment from 'moment';
import axios from 'axios';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import ContactList from './ContactList';
import AddContactDialog from './AddContactDialog';
import ActionAndErrorList from './ActionAndErrorList';
import LoadingSpinner from './LoadingSpinner';

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

  testGenerateTestError() {

    // generate a fake error
    const error = {
      message: 'An error has been generated',
      data: '404'
    };

    const newErrorHistory = this.constructor.buildNewError(error);

    this.addErrorToHistory(newErrorHistory);
    console.log(this.state.errorHistory);

  }

  componentDidMount() {
    this.testGenerateTestError();

    this.getContacts();
    this.registerInterceptors();

    setInterval(() => {
      this.removeStaleActionHistory();
      this.removeStaleErrorHistory();
    }, 5000);
  }

  /*
   Delete Button
   */

  handleDeleteContactClick(id) {
    this.deleteContact(id);
  }

  deleteContact(id) {
    // Used to highlight field during delete request
    this.setActiveContactId(id);
    this.removeAvailableContact(id);
    this.addActionToHistory('Deleted a contact', 'remove');

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
      return false;
    }

    this.addContact(this.state.contact, isFormSubmit);

    return true;
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

    console.log('errors in validation errors');
    console.log(errors);
    return errors;
  }

  static buildNewContact() {
    return {
      _id: uuid.v4(),
      name: '',
      occupation: '',
      avatar: '',
      selected: false
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

  handleAddToSelectedClick(contact) {
    this.addSelectedContact(contact);
    this.addActionToHistory(`Added ${contact.name} to selected contacts`, 'add');
  }

  addSelectedContact(contact) {
    const newContact = Object.assign({}, contact, {
      selected: true
    });
    this.loadingStarted();

    axios.put(`http://localhost:4000/contacts/${contact._id}`, newContact)
        .then((resp) => {
          this.loadingEnded();
          this.setState({
            contacts: this.state.contacts.filter((c) => {return c._id !== resp.data._id;})
                .concat(resp.data)
          });
        })
        .catch(err => console.log(err));

  }

  handleRemoveSelectedClick(contact) {
    this.removeSelectedContact(contact);
    this.addActionToHistory(`Removed ${contact.name} from selected contacts`, 'remove');
  }

  removeSelectedContact(contact) {
    this.loadingStarted();

    const newContact = Object.assign({}, contact, {
      selected: false
    });

    axios.put(`http://localhost:4000/contacts/${contact._id}`, newContact)
        .then((resp) => {
          this.loadingEnded();
          this.setState({
            contacts: this.state.contacts.filter((c) => {return c._id !== resp.data._id;})
                .concat(resp.data)
          });
        })
        .catch(err => console.log(err));
  }

  /*
   Available Contacts
   */

  getContacts() {

    this.loadingStarted();

    return axios.get('http://localhost:4000/contacts')
        .then((response) => {

          this.loadingEnded();

          this.setState({
            contacts: response.data
          });

        }).catch((err) => {
          console.log(err);
        });
  }

  addContact(contact, isFormSubmit) {

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
  }

  static batchableRemoveSelectedContact(contact) {

    const newContact = Object.assign({}, contact, {
      selected: false
    });

    return axios.put(`http://localhost:4000/contacts/${contact._id}`, newContact);
  }

  /* eslint-disable max-len */
  resetApplicationState() {
    const deletes = this.state.contacts.filter(contact => contact.selected).map((contact) => {
      return this.constructor.batchableRemoveSelectedContact(contact);
    });

    this.loadingStarted();

    axios.all(deletes)
        .then(() => {
          this.getContacts();

          this.setState({
            errorHistory: [],
            actionHistory: []
          });

          this.addActionToHistory('Reset application', 'reset');
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

  addActionToHistory(description, iconType) {

    const newAction = this.constructor.buildNewAction(description, iconType);

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

  static buildNewAction(description, iconType) {
    return {
      description: description || 'A default action',
      _id: uuid.v4(),
      expirationMoment: moment().add(25, 's'),
      iconType
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
      <MuiThemeProvider>
        <div className="app">
          <div className="loading-container">
            <LoadingSpinner isLoading={this.state.isLoading} />
          </div>

          <section className="action-and-error-column">
            <ActionAndErrorList
              handleResetClick={this.handleResetClick}
              actionHistory={this.state.actionHistory}
              errorHistory={this.state.errorHistory}
            />
          </section>
          <section className="column">
            <ContactList
              value={this.state.searchText}
              title={'Available'}
              contacts={this.getFilteredContacts(this.state.contacts)}
              handleRemoveFromSelected
              handleSelectContactClick={this.handleAddToSelectedClick}
              handleRemoveSelectedClick={this.handleRemoveSelectedClick}
              handleDeleteContactClick={this.handleDeleteContactClick}
              handleSearchBarChange={this.handleSearchBarChange}
              activeContactId={this.state.activeContactId}
              />
          </section>
          <section className="column" />
          <AddContactDialog
            contact={this.state.contact}
            handleAddContactSubmit={this.handleAddContactSubmit}
            onInputChange={this.onInputChange}
            validationErrors={this.state.validationErrors}
          />
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
