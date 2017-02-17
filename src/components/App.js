import React, {Component} from 'react';
import ContactList from './ContactList/ContactList';
import SearchBar from './SearchBar/SearchBar';
import SelectedContactsList from './SelectedContactsList/SelectedContactsList';
import ResetButton from './ResetButton/ResetButton';
import axios from 'axios';
import ContactForm from './ContactForm/ContactForm';

/* eslint max-len: [1, {"ignoreUrls": true}] */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [],
      selectedContacts: [],
      userActionsHistory: []
    };
  }

  handleAddContact(attributes) {
    axios.post('http://localhost:3001/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
  }

  handleUserAction() {

  }

  getContactsFromDB() {
    axios.get('http://localhost:3001/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data
        });
      })
      .catch(err => {
        console.log(`Error! ${err}`);
        alert('Oh shoot! We ran into an error, sorry!');
      });
  }

  handleReset() {
    this.setState({
      searchText: '',
      selectedContacts: []
    });
    this.forceUpdate(this.getContactsFromDB());
  }

  handleSelectContact(index) {
    const clickedContact = this.state.contacts.filter(
      contact => contact._id === index
    );

    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== index),
      selectedContacts: this.state.selectedContacts.concat(clickedContact)
    });
  }

  checkForSelectedContact() {
    if (this.state.selectedContacts.length === 0) {
      return (
        <p>No contacts selected, I am empty!</p>
      );
    }
  }

  handleDeselectContact(index) {
    const clickedContact = this.state.selectedContacts.filter(
      contact => contact._id === index
    );

    this.setState({
      contacts: this.state.contacts.concat(clickedContact),
      selectedContacts: this.state.selectedContacts.filter(
        contact => contact._id !== index
      )
    });
  }

  handleRemoveContact(event, index) {
    event.stopPropagation();
    axios.delete(`http://localhost:3001/contacts/${index}`)
      .then(() => {
        const newContacts = this.state.contacts.filter(
          contact => contact._id !== index
        );

        this.setState({
          contacts: newContacts
        });
      })
      .catch(err => console.log(err));
  }

  handleSearchBarChange(event) {
    console.log(event);
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
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  componentDidMount() {
    this.getContactsFromDB();
  }

  render() {
    return (
      <div className="App">
        <ResetButton
          onClickReset={this.handleReset.bind(this)}
        />
        <ContactForm onSubmit={this.handleAddContact.bind(this)} />
        <div className="contact-list-components">
          <h1>
            Searchable Contacts List
          </h1>
          <SearchBar
            value={this.state.searchText}
            onChange={this.handleSearchBarChange.bind(this)}
          />
          <ContactList
            contacts={this.getFilteredContacts()}
            onClickRemove={this.handleRemoveContact.bind(this)}
            onClickSelect={this.handleSelectContact.bind(this)}
            searchText={this.state.searchText}
          />
        </div>
        <div className="selected-contacts-components">
          <h1>
            Selected Contacts
          </h1>
          <SelectedContactsList
            selectedContacts={this.state.selectedContacts}
            onClickDeselect={this.handleDeselectContact.bind(this)}
            checkForSelectedContact={this.checkForSelectedContact()}
          />
        </div>
        <div className="user-actions-components">
          <h1>
            User Action History
          </h1>

        </div>
      </div>
    );
  }
}

export default App;
