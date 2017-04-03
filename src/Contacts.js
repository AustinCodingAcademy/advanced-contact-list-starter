import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import axios from 'axios';


class Contacts extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: []
    };
  }
  componentDidMount() {
    axios.get('/contacts')
        .then(resp => {
          this.setState({
            searchText: this.state.searchText,
            contacts: resp.data
          });
        })
        .catch(err => console.log(`Error! ${err}`));
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
      .catch(err => console.error(err));
  }

  handleDeleteContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
    .then(() => {
      const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

      this.setState({
        contacts: newContacts
      });
    })

    .catch(err => console.error(`ERROR! ${err}`));
  }


  render() {
    return (
      <div className="Contacts">
        <ContactForm onSubmit={this.handleAddContact.bind(this)} />
        <SearchBar value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)} />
        <ContactList onDeleteContact={this.handleDeleteContact.bind(this)}
          contacts={this.getFilteredContacts()} />
      </div>

    );
  }
}

export default Contacts;
