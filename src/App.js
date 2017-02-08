import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import axios from 'axios';
<<<<<<< HEAD

=======
>>>>>>> lesson-v4
/* eslint-disable max-len */
class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      selectedIds: [],
      contacts: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
<<<<<<< HEAD
      .then(resp => {
      this.setState({
      contacts: resp.data
    })
  }
    .catch(err => {
    console.log('Error! ${err}')
  })

  handleChange(event) {
=======
    .then(resp => {
      this.setState({
        contacts: resp.data
      });
    })
    .catch(err => {
      console.error(`Error! ${err}`);
    });
  }

  handleSearchBarChange(event) {
>>>>>>> lesson-v4
    this.setState({
      seachText: event.target.value
    })
  }

  handleSelectedContacts(_id) {
    this.setState({
      selectedIds: [ ...this.state.selectedIds, _id ]
    });
  }

  handleDeselectedContacts(id) {
    this.state.selectedIds.splice(this.state.selectedIds.indexOf(id),1);
    this.setState({
      selectedIds: this.state.selectedIds
    });
  }

  resetSelectedIds() {
    this.setState({
      selectedIds: []
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
<<<<<<< HEAD
    const contacts = this.state.contacts;
    if (!term) {
      return contacts;
    }
    return contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
=======
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  getSelectedContact() {
    return this.state.contacts.filter((contact) => {
      return this.state.selectedIds.indexOf(contact._id) >= 0;
    });
  }

  getClickedContacts() {
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(contact._id) >= 0;
    });
  }
  getSelectedContactIds() {
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(contact._id) >= 0;
    });
>>>>>>> lesson-v4
  }

  render() {
    return (
      <div className="App">
        <SearchBar value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />
<<<<<<< HEAD
        <ContactList contacts={this.getFilteredContacts()} />
=======
        <h1>Contacts</h1>
        <ContactList
          contacts={this.getFilteredContacts()}
          onClick={this.handleSelectedContacts.bind(this)}
          selectedIds={this.state.selectedIds}
         />
        <ContactList contacts={this.getClickedContacts()} />
        <h1>Selected Contacts</h1>
        <ContactList
          contacts={this.getSelectedContact()}
          onClick={this.handleDeselectedContacts.bind(this)} />
>>>>>>> lesson-v4
      </div>
    );
  }
 }

export default App;
