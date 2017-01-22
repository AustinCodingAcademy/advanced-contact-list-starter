import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <ContactList />
      </div>
    );
  }
}

export default App;
