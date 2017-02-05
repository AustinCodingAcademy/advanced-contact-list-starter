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
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data
        });
        console.log(resp.data);
      })
      .catch(err => console.log(`Error! ${err}`));
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

  addContact(contact) {
    const curContacts = [...this.state.contacts];
    const curContact = curContacts[contact - 1];
    const added = [...this.state.addedContacts];
    const newContact = {
      _id: curContact._id + 10,
      name: curContact.name,
      occupation: curContact.occupation,
      avatar: curContact.avatar,
      active: '',
      buttonType: 'Remove'
    };
    added.push(newContact);
    this.setState({
      addedContacts: added,
    });

    this.popContact(contact);
  }

  reset() {
    const curContacts = [...this.state.contacts];

    for (let i = 0; i < curContacts.length; i++) {
      curContacts[i].active = '';
    }

    this.setState({
      contacts: curContacts,
      addedContacts: [],
    });

  }

  popContact(contact) {

    const visContacts = [...this.state.contacts];
    visContacts[contact - 1].active = 'none';
    this.setState({
      contacts: visContacts
    });
  }

  removeContact(contact) {
    const added = [...this.state.addedContacts];
    let name = '';

    for ( let i = 0; i < added.length; i++) {
      if (added[i]._id === contact) {
        name = added[i].name;
        added.splice(i,1);
      }
    }
    const curContacts = [...this.state.contacts];

    for ( let i = 0; i < curContacts.length; i++) {
      if (curContacts[i].name === name) {
        curContacts[i].active = '';
      }
    }
    this.setState({
      contacts: curContacts,
      addedContacts: added
    });
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
        />
        <h2>Added Contacts</h2>
        <ContactList
          onContactClick={this.removeContact.bind(this)}
          contacts={this.state.addedContacts}
        />
      </div>

    );
  }
}

export default App;
