/* eslint-disable */

import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar';
import ResetButton from './ResetButton';
import SelectedContacts from './SelectedContacts';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      originalContacts: [],
      searchText: '',
      searchTextJob: 'Not functional yet',
      contacts: [],
      selectedContacts: []
    };
  }

  componentDidMount() {
   axios.get('/contacts')
     .then(resp => {
       this.setState({
         contacts: resp.data,
         originalContacts: resp.data
       })
     })
     .catch(err => console.log(`Error, sucka!! ${err}`));
 }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleJobSearchChange(event) {
    this.setState({
      searchTextJob: event.target.value
    });
  }

  handleContactClick(id) {
    console.log("Added Prof ID: " + id);
    this.setState({
      selectedContacts: this.state.selectedContacts.concat(id)
    });
    console.log(this.state.selectedContacts.map(item => {return item.name}));
  }

  handleContactRemove(id) {
    console.log(id);
  }
  

  handleResetClick() {
    console.log('reset button clicked');
    this.setState({
      searchText: ""
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    if (!term) {
      return this.state.contacts;
    }
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().search(term) >= 0;
    });
  }

  getSelectedContacts() {

  }

  handleAddContact(attributes) {
    axios.post('/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
  }

  handleDeleteContact(_id) {
    axios.delete('/contacts/${_id}')
      .then(resp => {
        const newContacts = this.state.contacts.filter(contact => contact._id != _id);

        this.setState({
          contacts: newContacts
        });
      })
      .catch(err => console.log(`Error, bish! ${err}`));
  }

    render() {
      return (
        <section className="app">
          <h1>Contact List</h1>

          <ContactForm onSubmit={this.handleAddContact.bind(this)} />

          <h3>&#9660; Search by Name &#9660;</h3>

          <SearchBar
            searchText={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />

          <ResetButton
            onClickReset={this.handleResetClick.bind(this)} />

          <ContactList
            contacts={this.getFilteredContacts()}
            searchText={this.state.searchText}
            onClick={this.handleContactClick.bind(this)}
            onDelete={this.handleDeleteContact.bind(this)} />

            <SelectedContacts
              contacts={this.state.contacts}
              selectedContacts={this.state.selectedContacts}
              onClick={this.handleContactRemove.bind(this)} />

        </section>
      );
    }
  }

  //

  // <h3>&#9660; Search by Job &#9660;</h3>
  //
  // <SearchBar
  //   searchText={this.state.searchTextJob}
  //   onChange={this.handleJobSearchChange.bind(this)} />

export default App;
