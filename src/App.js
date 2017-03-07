

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import ContactListContainer from './containers/ContactListContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import SelectedContactList from './components/SelectedContactList/index';
import ResetButton from './components/ResetButton/index';
import ActionHistory from './components/ActionHistory/index';
import ContactForm from './components/ContactForm/index';
import AlertWindow from './components/AlertWindow/index';
import AddContactButton from './components/AddContactButton/index';

/* eslint max-len: [1, {"ignoreUrls": true}] */
/* eslint no-console: 0 */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [],
      alert: false,
      alertMessage: '',
      add: false,
      selectedContacts: [],
      currentActionId: 2000,
      actionHistory: [],
      originalState: {}
    };
  }

  componentDidMount() {
    this.props.onContactsLoad();
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSelect(id) {
    this.addContact(id, this.state.selectedContacts);
    this.removeContact(id, this.state.contacts);
    this.addAction('select', id);
  }

  handleUnselect(id) {
    this.addContact(id, this.state.contacts);
    this.removeContact(id, this.state.selectedContacts);
    this.addAction('unselect', id);
  }

  handleReset() {
    this.contactsGetRequest();
    this.addAction('reset');
  }

  handleRemoveContact(e, id) {
    e.stopPropagation();
    this.removeContact(id, this.state.contacts);
    this.addAction('remove', id);
  }

  handleOpenContact() {
    this.setState({
      add: true
    });
  }

  handleAddContact(attributes) {
    this.setState({
      alert: true,
      alertMessage: 'add'
    });
    axios.post('/contacts', attributes)
      .then(response => {
        setTimeout( () => {
          this.setState({
            alert: false,
            add: false,
            contacts: [...this.state.contacts, response.data],
            originalState: {
              searchText: '',
              contacts: [...this.state.contacts, response.data],
              selectedContacts: []
            }
          });
          this.addAction('add', response.data._id);
        }, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDeleteContact(e, id) {
    e.stopPropagation();
    this.setState({
      alert: true,
      alertMessage: 'delete'
    });
    axios.delete(`/contacts/${id}`)
      .then(() => {
        setTimeout(() => {
          this.addAction('delete',id);
          this.removeContact(id);
          this.setState({
            alert: false
          });
        }, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClear() {
    this.setState({
      actionHistory: []
    });
  }

  handleRemoveAction(id) {
    axios.delete(`/actions/${id}`)
      .then(() => {
        this.setState({
          actionHistory: this.state.actionHistory.filter(action => {
            return action._id !== id;
          })
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  contactsGetRequest() {
    // axios.get('https://alexjgaw.github.io/contact-list/db.json')
    this.setState({
      alert: true,
      alertMessage: 'get'
    });
    axios.get('/contacts')
      .then(response => {
        setTimeout( () => {
          this.setState({
            alert: false,
            contacts: response.data,
            originalState: {
              searchText: '',
              contacts: response.data,
              selectedContacts: []
            }
          });
        }, 1000);
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  addAction(actionType, id) {
    const contacts = this.state.originalState.contacts;
    const target = contacts.filter(contact => contact._id === id);
    const name = id ? target[0].name : null;

    let actionMessage;

    switch (actionType) {
      case 'select':
        actionMessage = `Selected ${name}`;
        break;
      case 'unselect':
        actionMessage = `Unselected ${name}`;
        break;
      case 'remove':
        actionMessage = `Removed ${name}`;
        break;
      case 'delete':
        actionMessage = `Deleted ${name} from database`;
        break;
      case 'reset':
        actionMessage = 'Reset application to initial state';
        break;
      case 'add':
        actionMessage = `Added ${name} to contact list`;
        break;
      default:
        actionMessage = 'Some idiot programmer forgot to supply an actionType';
        break;
    }

    const newAction = {
      actionMessage
    };

    axios.post('/actions', newAction)
      .then(response => {
        this.setState({
          actionHistory: [response.data].concat(this.state.actionHistory)
        });
      })
      .catch(error => {
        console.log(error);
      });
  // End addAction
  }

  addContact(id, list = this.state.contacts) {

    let fromList = [];
    let key = '';
    if (list === this.state.contacts) {
      fromList = this.state.selectedContacts;
      key = 'contacts';
    } else {
      fromList = this.state.contacts;
      key = 'selectedContacts';
    }
    const selectedContact = fromList.filter( contact => contact._id === id);
    const newState = {};
    newState[key] = list.concat(selectedContact);

    this.setState(newState);
  }

  removeContact(id, list = this.state.contacts) {
    const key = list === this.state.contacts ? 'contacts' : 'selectedContacts';
    const newState = {};
    newState[key] = list.filter( contact => contact._id !== id);

    this.setState(newState);
    return newState;
  }

  removeContactForm() {
    this.setState({
      add: false
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBarContainer />
        {/*
          This section mounts the ContactForm component
          depending on whether this.state.add is true.
        */}
        {this.state.add ?
          <ContactForm
            onSubmit={this.handleAddContact.bind(this)}
            onEscape={this.removeContactForm.bind(this)} /> :
          null
        }
        {/*
          Mounts AlertWindow depending on whether
          this.state.alert is true
        */}
        {this.state.alert ?
          <AlertWindow message={this.state.alertMessage} /> :
          null
        }

        <AddContactButton
          onOpenContact={this.handleOpenContact.bind(this)}
        />
        <ResetButton
          onReset={this.handleReset.bind(this)}
        />
        <ContactListContainer
          onRemove={this.handleRemoveContact.bind(this)}
          onDelete={this.handleDeleteContact.bind(this)}
          onSelect={this.handleSelect.bind(this)}
        />
        <SelectedContactList
          contacts={this.state.selectedContacts}
          onUnselect={this.handleUnselect.bind(this)}
        />
        <ActionHistory
          actions={this.state.actionHistory}
          onClear={this.handleClear.bind(this)}
          onRemove={this.handleRemoveAction.bind(this)}
        />
      </div>
    );
  }
}

App.propTypes = {
  onContactsLoad: PropTypes.func.isRequired
};

export default App;
