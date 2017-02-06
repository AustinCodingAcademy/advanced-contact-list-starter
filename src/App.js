import React, { Component } from 'react';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar';
import ResetButton from './ResetButton';
import SelectedContacts from './SelectedContacts';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      searchTextJob: 'Not functional yet',
      contacts: [],
      selectedContacts: []
    };
  }

  componentDidMount() {
   axios.get('http://localhost:4000/contacts')
     .then(resp => {
       this.setState({
         contacts: resp.data
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

  handleContactAdd(id, name, job, pic) {
    const prof = {
      "id": id,
      "name": name,
      "occupation": job,
      "avatar": pic
    }
    console.log("Added: " + prof);
    if (this.state.selectedContacts.indexOf(prof.id) < 0) {
      this.setState({
        selectedContacts: this.state.selectedContacts.concat(prof)
      });
      console.log(this.state.selectedContacts.map(item => {return item.name}));
    }

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
    // const jobTerm = this.state.searchTextJob.trim().toLowerCase();
    if (!term) {
      return this.state.contacts;
    }
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().search(term) >= 0;
    });
  }



    render() {
      return (
        <section className="app">
          <h1>Contact List</h1>
          <h3>&#9660; Search by Name &#9660;</h3>

          <SearchBar
            searchText={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />

          <h3>&#9660; Search by Job &#9660;</h3>

          <SearchBar
            searchText={this.state.searchTextJob}
            onChange={this.handleJobSearchChange.bind(this)} />

          <ResetButton
            onClickReset={this.handleResetClick.bind(this)} />

          <ContactList
            contacts={this.getFilteredContacts()}
            searchText={this.state.searchText}
            onClick={this.handleContactAdd.bind(this)} />



        </section>
      );
    }
  }

  // <SelectedContacts
  //   contacts={this.contacts}
  //   selectedContacts={this.state.selectedContacts}
  //   onClick={this.handleContactRemove.bind(this)} />

export default App;
