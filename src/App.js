import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import ContactList from './ContactList';
import SelectedContactList from './SelectedContactList';
import ResetButton from './ResetButton';
import ContactForm from './ContactForm';


/* eslint-disable max-len */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [],
      selectedContacts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data
        });
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSelectContact(contact) {
    const newSelectedContact = [
      ...this.state.selectedContacts,
      contact
    ];

    const newContactsArray = this.state.contacts.filter(contactSelected => contactSelected !== contact);

    this.setState({
      selectedContacts: newSelectedContact,
      contacts: newContactsArray
    });
  }

  handleUnselectContact(selectedContact) {
    const newSelectedContact = [
      ...this.state.contacts,
      selectedContact
    ];

    const newSelectedContactsArray = this.state.selectedContacts.filter(contactSelected => contactSelected !== selectedContact);

    this.setState({
      contacts: newSelectedContact,
      selectedContacts: newSelectedContactsArray
    });
  }

  resetContacts() {
    this.setState({
      contacts: axios.get('http://localhost:4000/contacts')
            .then(resp => {
              this.setState({
                contacts: resp.data
              });
            })
            .catch(err => {
              console.log(`Error ${err}`);
            }),
      selectedContacts: []
    });
  }

  handleSubmitContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
  }

  getFilteredContacts() {
    // removes any white space before what the user searches for and makes the input all lowercase
    const search = this.state.searchText.trim().toLowerCase();

    // this returns the filtered text the user inputs in the search bar
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(search) >= 0;
    });
  }

  handleRemoveContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(() => {
        this.setState({
          contacts: this.state.contacts.filter(contact => contact._id !== _id)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>
          Contact List!
        </h1>
        <ContactForm onSubmit={this.handleSubmitContact.bind(this)} />
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
        <ResetButton
          onResetClick={this.resetContacts.bind(this)}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          onRemoveContact={this.handleRemoveContact.bind(this)}
          onSelectContact={this.handleSelectContact.bind(this)}
        />
        <SelectedContactList
          selectedContacts={this.state.selectedContacts}
          onUnselectContact={this.handleUnselectContact.bind(this)}
        />
      </div>
    );
  }
}

export default App;
