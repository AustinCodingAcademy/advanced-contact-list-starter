import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar.js';
import SelectedContactList from './SelectedContactList';
import ResetButton from './ResetButton';

/* eslint max-len: [1, {"ignoreUrls": true}] */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      contacts: [
        {
          _id: 9,
          name: 'Jane Elliott',
          occupation: 'Educator',
          avatar: 'http://images.smh.com.au/2010/06/28/1651760/jane-elliott-420x0.jpg'
        },
        {
          _id: 1,
          name: 'Dale Cooper',
          occupation: 'FBI Agent',
          avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg'
        },
        {
          _id: 8,
          name: 'Sylvia Rivera',
          occupation: 'Y\'all better quiet down!',
          avatar: 'http://lgbtweekly.com/wp-content/uploads/2014/04/wpid-145_4205_5852.jpg'
        },
        {
          _id: 2,
          name: 'Spike Spiegel',
          occupation: 'Bounty Hunter',
          avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
        },
        {
          _id: 6,
          name: 'James Baldwin',
          occupation: 'Novelist, social critic',
          avatar: 'https://pbs.twimg.com/profile_images/732030948712300548/vk5RU7x2.jpg'
        },
        {
          _id: 3,
          name: 'Wirt',
          occupation: 'Adventurer',
          avatar: 'http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg'
        },
        {
          _id: 7,
          name: 'Linda Martin Alcoff',
          occupation: 'Philosopher, author',
          avatar: 'http://static.wixstatic.com/media/09416d_81e7b64789714aaeadc8742b597dff72.png_srz_474_474_85_22_0.50_1.20_0.00_png_srz'
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
      selectedContacts: [],
    };
    this.originalState = JSON.parse(JSON.stringify(this.state));
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSelect(id) {
    this.addContact(id, this.state.selectedContacts);
    this.removeContact(id, this.state.contacts);
  }

  handleUnselect(id) {
    this.addContact(id, this.state.contacts);
    this.removeContact(id, this.state.selectedContacts);
  }

  handleReset() {
    this.setState(JSON.parse(JSON.stringify(this.originalState)));
  }

  handleRemove(e, id) {
    e.stopPropagation();
    this.removeContact(id, this.state.contacts);
  }

  addContact(id, list = this.state.contacts) {

    let fromList = [];
    let key = '';
    if (list === this.state.contacts) {
      fromList = this.state.selectedContacts;
      key = 'contacts';
    } else {
      fromList = this.state.contacts;
      key = 'selectedContacts';
    }
    const selectedContact = fromList.filter( contact => contact._id === id);
    const newState = {};
    newState[key] = list.concat(selectedContact);

    this.setState(newState);
  }

  removeContact(id, list = this.state.contacts) {
    const key = list === this.state.contacts ? 'contacts' : 'selectedContacts';
    const newState = {};
    newState[key] = list.filter( contact => contact._id !== id);

    this.setState(newState);
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
        <SearchBar
          value={this.state.searchText}
          onChange={this.handleSearchBarChange.bind(this)}
        />
        <ResetButton
          onReset={this.handleReset.bind(this)}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          searchValue={this.state.searchText}
          onRemove={this.handleRemove.bind(this)}
          onSelect={this.handleSelect.bind(this)}
        />
        <SelectedContactList
          contacts={this.state.selectedContacts}
          onUnselect={this.handleUnselect.bind(this)}
        />
      </div>
    );
  }
}

export default App;
