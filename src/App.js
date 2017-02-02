import React, { Component } from "react";
import axios from "axios";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: "",
      contacts: []
    };
  }

  componentDidMount() {
      axios.get("http://localhost:4000/contacts")
        .then(resp => {
          this.setState({
            contacts: resp.data
          });
        })
        .catch(err => console.log(`Error! ${err}`));
    }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts() {
      const term = this.state.searchText.trim().toLowerCase();
      //whoops I may have copy pasted this part
      const filteredContacts = this.state.contacts.filter(contact => {
        return contact.name.toLowerCase().indexOf(term) >= 0;
      });

      return filteredContacts;
    }

  render() {
      return (
      <div className="App">
        <SearchBar onChange={this.handleSearchBarChange.bind(this)} value={this.state.searchText}/>
        <ContactList contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;
