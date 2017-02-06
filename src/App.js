import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: []
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
        console.error('Error! $(err)')
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
      return contact.name.toLowerCase().search(term) >= 0;
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
    .then(() => {
      const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

      this.setState({
        contacts: newContacts
      });
    })

    .catch(err => console.log(`ERROR! ${err}`));
  }


  render() {
    return (
      <div className="App">
        <ContactForm onSubmit={this.handleAddContact.bind(this)}
          onClick={this.handleDeleteContact.bind(this)} />
        <SearchBar value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />
        <ContactList onDeleteContact={this.handleDeleteContact.bind(this)}
          contacts={this.getFilteredContacts()} />
      </div>

    );
  }
}

export default App;
