import React, { Component } from 'react';
import ContactList from './components/contact-list.js';
import SearchBar from './components/search-bar.js';
import Button from './components/button.js';

const data = {
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



export default class App extends Component {
  constructor() {
    super();

    this.state = {
      data,
      query: '',
      selected: ['No Contacts Selected']
    };
  }

  render() {
    return (
      <div className="App">
        <h1>
          <SearchBar value={this.state.query} handleSearch={this.handleSearch.bind(this)} />
          <ContactList data={this.getFilteredContacts()} handleSelect={this.handleSelect.bind(this)} searchValue={this.state.query} />
        </h1>
        <h1>Selected Contacts </h1>
        <ContactList data={this.getSelectedContacts()} handleSelect={this.handleSelect.bind(this)} searchValue={this.state.query} />
        <Button resetSelection={this.resetSelection.bind(this)} />
      </div>
    );
  }

  resetSelection() {

    this.setState(
        this.state.data.contacts.map((obj) => {
          obj.isSelected = false;
        })
        );
  }

  handleSearch(value) {
    this.setState({
      query: value
    });
  }

  handleSelect(value) {

    let result = this.state.data.contacts.filter(function( obj ) {
    return obj._id == value;
   });

      result = result[0];
if(result){
      result.isSelected ? result.isSelected=false : result.isSelected=true;

      this.setState(
      {result}
      );
}

  }

  getFilteredContacts() {
    //contact.name.toLowerCase().indexOf(term) >= 0 Remove trailing white space and make query lowercase
    const term = this.state.query.trim().toLowerCase();
    // Filter contact list to return array of contacts that match search
    return this.state.data.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0 && contact.isSelected != true;
    });
  }

  getSelectedContacts() {

      const term = this.state.query.trim().toLowerCase();
    // Filter contact list to return array of contacts that are not selected
    return this.state.data.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0 && contact.isSelected === true;
    });
  }


}
