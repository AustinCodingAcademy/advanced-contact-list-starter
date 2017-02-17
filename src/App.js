import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import axios from 'axios';
import SelectedContactList from './SelectedContactList';
import ContactForm from './ContactForm';

 /* eslint-disablen max-len */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      contacts: [],
      selectedContacts: []
    };
  }
  handleSelectContact(contact) {
    const newSelectedContact = [
      ...this.state.selectedContacts,
      contact
    ];
    const newContactsArray = this.state.contacts.filter(selected => selected !== contact);

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
    const newSelectedContactsArray = this.state.selectedContacts.filter(item => item !== selectedContact);
    this.setState({
      contacts: newSelectedContact,
      selectedContacts: newSelectedContactsArray
    });
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  componentDidMount() {
    axios.get('http://localhost:3001/contacts')
    .then(resp => {
      this.setState({
        contacts: resp.data,
        originalState:{
          searchText: '',
          contacts: resp.data,
          selectedContacts: []
        }
      });
    })
    .catch(() => {
      console.log('Error');
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  handleAddContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
  }


  handleDeleteContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
    .then(() =>
    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== _id),
      selectedContacts: this.state.selectedContacts.filter(contact => contact._id !== _id)
    })
    )
  }

  handleReset(){
    this.setState(this.state.originalState)
  }

  render() {
    return (
      <div className="App">

        <h1> Contacts Lists </h1>

        <SearchBar
          value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)}
        />

        <ContactForm
          onSubmit={this.handleAddContact.bind(this)}
        />

        <ContactList
          onResetClick={this.handleReset.bind(this)}
          onDeleteContact={this.handleDeleteContact.bind(this)}
          contacts={this.getFilteredContacts()}
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
