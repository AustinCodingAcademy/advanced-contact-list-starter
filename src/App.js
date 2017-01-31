import React, {Component} from 'react';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar.js';
import SelectedContactsList from './SelectedContactsList.js';
import ResetButton from './ResetButton.js';
import axios from 'axios';

/* eslint max-len: [1, {"ignoreUrls": true}] */

class App extends Component {
  constructor(props) {
    super(props);

    this._initialState = {
      searchText: '',
      contacts: [],
      selectedContacts: []
    };

    this.state = this._initialState;
  }

  handleReset() {
    this.setState(this._initialState);
  }

  handleSelectContact(index) {
    const clickedContact = this.state.contacts.filter(
      contact => contact._id === index
    );

    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== index),
      selectedContacts: this.state.selectedContacts.concat(clickedContact)
    });
  }

  checkForSelectedContact() {
    if (this.state.selectedContacts.length === 0) {
      return (
        <p>No contacts selected, I am empty!</p>
      );
    }
  }

  handleDeselectContact(index) {
    const clickedContact = this.state.selectedContacts.filter(
      contact => contact._id === index
    );

    this.setState({
      contacts: this.state.contacts.concat(clickedContact),
      selectedContacts: this.state.selectedContacts.filter(
        contact => contact._id !== index
      )
    });
  }

  handleRemoveContact(index) {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== index)
    });
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.state.contacts;

    if (!term) {
      return contacts;
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data
        });
      })
      .catch(err => {
        console.log(`Error! ${err}`);
        alert('Oh shoot! We ran into an error, sorry!');
      });
  }

  render() {
    return (
      <div className="App">
        <ResetButton
          onClickReset={this.handleReset.bind(this)}
        />
        <h1>
          Searchable Contacts List
        </h1>
        <SearchBar
          value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          onClickRemove={this.handleRemoveContact.bind(this)}
          onClickSelect={this.handleSelectContact.bind(this)}
          searchText={this.state.searchText}
        />
        <h1>
          Selected Contacts
        </h1>
        <SelectedContactsList
          selectedContacts={this.state.selectedContacts}
          onClickDeselect={this.handleDeselectContact.bind(this)}
          checkForSelectedContact={this.checkForSelectedContact()}
        />
      </div>
    );
  }
}

export default App;
