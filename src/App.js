import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: [
        {
          _id: 12,
          name: 'LaMarcus Aldridge',
          occupation: 'Forward',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/200746.png'
        },
        {
          _id: 1,
          name: 'Kyle Anderson',
          occupation: 'Guard-Forward',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203937.png'
        },
        {
          _id: 30,
          name: 'Joel Anthony',
          occupation: 'Center',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201202.png'
        },
        {
          _id: 42,
          name: 'Davis Bertans',
          occupation: 'Center',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202722.png'
        },
        {
          _id: 3,
          name: 'Dewayne Dedmon',
          occupation: 'Center',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203473.png'
        },
        {
          _id: 11,
          name: 'Bryn Forbes',
          occupation: 'Guard',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627854.png'
        },
        {
          _id: 16,
          name: 'Paul Gasol',
          occupation: 'Center',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2200.png'
        },
        {
          _id: 20,
          name: 'Manu Ginobili',
          occupation: 'Guard',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1938.png'
        },
        {
          _id: 14,
          name: 'Danny Green',
          occupation: 'Guard',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201980.png'
        },
        {
          _id: 10,
          name: 'David Lee',
          occupation: 'Forward-Center',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/101135.png'
        },
        {
          _id: 2,
          name: 'Kawhi Leonard',
          occupation: 'Forward',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202695.png'
        },
        {
          _id: 8,
          name: 'Patty Mills',
          occupation: 'Guard',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201988.png'
        },
        {
          _id: 5,
          name: 'Dejounte Murray',
          occupation: 'Guard',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627749.png'
        },
        {
          _id: 9,
          name: 'Tony Parker',
          occupation: 'Guard',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2225.png'
        },
        {
          _id: 17,
          name: 'Jonathan Simmons',
          occupation: 'Guard-Forward',
          avatar: 'http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203613.png'
        }
      ]
    };
  }

  handleSearchBarChange(event) {
    this.setState({
      contacts: this.state.contacts,
      searchText: event.target.value
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    return this.state.contacts.filter( contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />
        <ContactList contacts={this.getFilteredContacts()} listName='Spurs Roster' />
        <ContactList contacts={this.state.contacts} listName='Starting Lineup'/>
      </div>
    );
  }
}

export default App;
