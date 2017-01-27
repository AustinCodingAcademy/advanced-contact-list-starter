import React, { Component } from 'react';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar.js';
import SelectedContactsList from './SelectedContactsList.js';

/* eslint max-len: [1, {"ignoreUrls": true}] */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [
        {
          _id: 1,
          name: 'Dale Cooper',
          occupation: 'FBI Agent',
          avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg'
        },
        {
          _id: 2,
          name: 'Spike Spiegel',
          occupation: 'Bounty Hunter',
          avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
        },
        {
          _id: 3,
          name: 'Wirt',
          occupation: 'adventurer',
          avatar: 'http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg'
        },
        {
          _id: 4,
          name: 'Michael Myers',
          occupation: 'Loving little brother',
          avatar: 'http://vignette2.wikia.nocookie.net/villains/images/e/e3/MMH.jpg/revision/latest?cb=20150810215746'
        },
        {
          _id: 5,
          name: 'Dana Scully',
          occupation: 'FBI Agent',
          avatar: 'https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg'
        }
      ],
      selectedContacts: []
    };
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

  handleRemoveContact(index) {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== index)
    });
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  render() {
    return (
      <div className="App">
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
        />
        <h1>
          Selected Contacts
        </h1>
        <SelectedContactsList
          selectedContacts={this.state.selectedContacts}
          onClickDeselect={this.handleDeselectContact.bind(this)}
        />
      </div>
    );
  }
}

export default App;
