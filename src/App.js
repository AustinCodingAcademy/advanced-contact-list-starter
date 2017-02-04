import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';


/* eslint-disable max-len */

class App extends Component {
  constructor() {
    console.log('constructor');
    debugger;
    super();

    this.state = {
      query: '',

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
      ]

    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    debugger;
  }

  handleSearchString(value) {
    this.setState({
      query: value
    });

  }


  getFilteredContacts() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.query.trim().toLowerCase();
    const contacts = this.state.contacts;

    if (!term) {
      return contacts;
    }

    // Filter will return a NEW array of contacts, the contact will
    // be included in the array if the function returns true,
    // and excluded if the function returns false
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }




  render() {

    return (

      <div className="App">

        <h1>
          Contact List!
        </h1>

        <SearchBar handleSearchString={this.handleSearchString.bind(this)} value={this.state.query} />

        <ContactList data={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;
