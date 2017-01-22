import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContactList from './ContactList.js';
import SearchBar from './SearchBar.js'

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
