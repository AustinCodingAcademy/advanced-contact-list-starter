import React, { Component } from 'react';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          Contact List!
        </h1>
        <SearchBar />
        <ContactList />
      </div>
    );
  }
}

export default App;
