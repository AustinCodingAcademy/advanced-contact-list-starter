import React, { Component } from 'react';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar';
import ResetButton from './ResetButton';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      searchTextJob: '',
      contacts: [
        {
          _id: 1,
          name: 'Yoda',
          occupation: 'Jedi Master',
          avatar: 'https://pbs.twimg.com/profile_images/758935085550665729/OABKbhBA.jpg'
        },
        {
          _id: 2,
          name: 'Gizmo',
          occupation: 'Mogwai',
          avatar: 'https://pbs.twimg.com/profile_images/555100203691163648/lOSh3wbL_400x400.png'
        },
        {
          _id: 3,
          name: 'Fizzgig',
          occupation: 'Pet / Bodyguard',
          avatar: 'http://vignette1.wikia.nocookie.net/darkcrystal/images/8/81/Fizzgig.jpg/revision/latest?cb=20080506205401'
        },
        {
          _id: 4,
          name: 'Bilbo Baggins',
          occupation: 'Shire Gardener',
          avatar: 'http://www.majorspoilers.com/wp-content/uploads/2011/02/BilboInTheHobbit.jpg'
        },
        {
          _id: 5,
          name: 'Taz Devil',
          occupation: '@%^#&*!!!',
          avatar: 'https://s-media-cache-ak0.pinimg.com/originals/ee/a0/e4/eea0e450c9ea39b4ad7c58e36b66edad.jpg'
        },
        {_id: 6,
        name: 'Nugget Soape',
        occupation: 'Lap dog',
        avatar: 'https://scontent-dft4-1.xx.fbcdn.net/v/t31.0-8/s720x720/131442_151099011607098_3027955_o.jpg?oh=9ac78e6177195a23bcd1437560dd630c&oe=5919D436'
        }
      ],
      selectedContacts: [],
    };
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleJobSearchChange(event) {
    this.setState({
      searchTextJob: event.target.value
    });
  }

  handleContactClick(id) {
    console.log(id);
  }

  handleResetClick() {
    console.log('reset button clicked');
    this.setState({
      searchText: ""
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const jobTerm = this.state.searchTextJob.trim().toLowerCase();

    return this.state.contacts.filter(contact => {
      return (contact.name.toLowerCase().indexOf(term) >= 0 /*|| contact.occuptaion.toLowerCase().indexOf(jobTerm) >= 0*/);
    });
  }



    render() {
      return (
        <section className="app">
          <h1>Contact List</h1>
          <h3>&#9660; Search by Name &#9660;</h3>

          <SearchBar
          searchText={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)} />

          <h3>&#9660; Search by Job &#9660;</h3>

          <SearchBar
          searchText={this.state.searchTextJob}
          onChange={this.handleJobSearchChange.bind(this)} />

          <ResetButton
          onClickReset={this.handleResetClick.bind(this)} />

          <ContactList
          contacts={this.getFilteredContacts()}
          searchText={this.state.searchText}
          onClick={this.handleContactClick.bind(this)} />

        </section>
      );
    }
  }


export default App;
