import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
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
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  getFilteredContacts() {

    const term = this.state.searchText.trim().toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  // popContact(names) {
  //   const curState = [...this.state.contacts]; // always clone the state, never mutate directly
  //   for (let i = 0; i < curState.length; i++) {
  //     if (names.includes(curState[i].name)) {
  //       curState[i].active = 'none';
  //     } else {
  //       curState[i].active = '';
  //     }
  //   }
  //   this.setState({
  //     contacts: curState
  //   });
  // }

  addContact(contact) {

    const curContacts = [...this.state.contacts];
    const curContact = curContacts[contact - 1];
    const added = [...this.state.addedContacts];

    added.push(curContact.name);

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
      addedContacts: []
    });

  }

  popContact(contact) {

    const visContacts = [...this.state.contacts];
    visContacts[contact - 1].active = 'none';
    this.setState({
      contacts: visContacts
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />
        <ContactList
          onContactClick={this.addContact.bind(this)}
          contacts={this.getFilteredContacts()}
        />
        <div>
          <button onClick={() => this.reset()}>Reset</button>
          <h2>Added Contacts</h2>
          <div>
            {this.state.addedContacts.map(name => {
              return (
                <div className="added-item" key={name}>
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    );
  }
}

export default App;
