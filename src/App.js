import React, { Component } from 'react';
import ContactList from './ContactList';
import AddedContactList from './AddedContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      contacts: [],
      addedContacts: [],
    };
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  componentDidMount() {
    axios.get('/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data
        });
      })
      .catch(err => {
        console.log(`Error! ${err}`)
      });
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  componentWillMount() {
    console.log('componentWillMount');
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

  handleAddContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
  }

  addContact(attributes) {
    const newContacts = this.state.contacts.filter(contact => contact._id !== attributes._id);

    axios.post('http://localhost:4000/addedContacts', attributes)
      .then(resp => {
        this.setState({
          contacts: newContacts,
          addedContacts: [...this.state.addedContacts, resp.data]
        });
      });
  }

  reset() {
    const all = [...this.state.contacts, ...this.state.addedContacts];
    const empty = [];
    axios({
      method: 'post',
      url: 'http://localhost:4000/contacts',
      contacts: {all}
    });
    for (const added of this.state.addedContacts) {
      axios.delete(`http://localhost:4000/addedContacts/${added._id}`);
    }
    this.setState({
      contacts: all,
      addedContacts: empty
    });

  }

  popContact(contact) {

    const visContacts = [...this.state.contacts];
    visContacts[contact - 1].active = 'none';
    this.setState({
      contacts: visContacts
    });
  }

  removeContact(attributes) {
    const id = attributes._id;
    const newContacts = this.state.addedContacts.filter(contact => contact._id !== attributes._id);
    axios.delete(`http://localhost:4000/addedContacts/${id}`)
      .then(resp => {
        this.setState({
          addedContacts: newContacts,
          contacts: [...this.state.contacts, attributes]
        });
      })
      .catch(err => console.log(`ERROR! ${err}`));
  }


  render() {
    return (
      <div className="App">
        <ContactForm
          onSubmit={this.handleAddContact.bind(this)}
        />
        <SearchBar
          value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)}
        />
        <button onClick={() => this.reset()}>Reset</button>
        <ContactList
          onContactClick={this.addContact.bind(this)}
          contacts={this.getFilteredContacts()}
          search={this.state.searchText}
        />
        <h2>Added Contacts</h2>
        <AddedContactList
          onContactClick={this.removeContact.bind(this)}
          contacts={this.state.addedContacts}
          search={this.state.searchText}
        />
      </div>

    );
  }
}

export default App;
