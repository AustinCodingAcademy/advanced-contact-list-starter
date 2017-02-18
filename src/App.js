import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import axios from 'axios';
import SelectedContactList from './SelectedContactList';
import ContactForm from './ContactForm';
import ActionList from './ActionList';

 /* eslint-disablen max-len */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      contacts: [],
      selectedContacts: [],
      actionMessage: 'Action Hisory',
      actionHistory: []
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
    this.actionhistorylist('select', contact);
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
    this.actionhistorylist('unselect', selectedContact)
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
    this.actionhistorylist('add', attributes);
  }


  handleDeleteContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
    .then(() =>
    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== _id),
      selectedContacts: this.state.selectedContacts.filter(contact => contact._id !== _id)
    })
  );
    this.actionhistorylist('delete', _id);
  }

  handleReset() {
    this.setState(this.state.originalState);
    this.actionhistorylist('reset');
  }

  actionhistorylist(action, contact) {

    let actionMessage = '';

    switch (action) {
      case 'select':
        actionMessage = `you have selected ${contact.name}`;
        break;
      case 'unselect':
        actionMessage = `You have unselected ${contact.name}`;
        break;
      case 'delete':
        actionMessage = `You have deleted ${contact.name}`;
        break;
      case 'reset':
        actionMessage = 'You have reset the contacts';
        break;
      case 'add':
        actionMessage = `You have created a new contact - ${contact.name}`;
        break;
      default:
        actionMessage = '';
    }

    const newActionHistory = [...this.state.actionHistory, actionMessage];

    this.setState({
      actionHistory: newActionHistory
    });
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
        <ActionList
          actionMessage={this.state.actionHistory}
        />

      </div>
    );
  }
}


export default App;
