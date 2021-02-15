import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import ContactList from './ContactList.js';
// import ContactForm from './ContactForm';
import axios from './Axios';
/* eslint max-len: [1, {"ignoreUrls": true}] */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: []
    };
  }

  ComponentDidMount() {
    console.log('ComponentDidMount');
    this.setState( {
      loading: true
    });
    axios.get('http://localhost:4000/contacts')
      .then(result => {
        console.log('loading successful', result);
        this.setState( {
          loading: false,
          contacts: result.data
        });
      }).catch(() => {
        console.log('handle error');
        this.setState( {
          errorMessage: 'loading failed',
          loading: false
        });
      });
  }

  handleSearchBarChanges(event) {
    this.setState({
      contacts: this.state.contacts,
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
      return contact.name.toLowerCase().search(term) >= 0;
    });
  }

  handleContactSelecton(contact) {
    const newSelectedIds = [
      ...this.state.selectedContactIds,
      contact._id
    ];


    this.setState({
      selectedContactIds: newSelectedIds
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Contact List!
        </h1>
        <SearchBar
          onChange={this.handleSearchBarChanges.bind(this)} />
        <ContactList
          contact={this.getFilteredContacts}
          onButtonClick={this.handleContactSelect.bind(this)} />
      </div>
    );
  }
}

export default App;
