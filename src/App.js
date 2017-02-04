import React, { Component } from 'react';
import ContactList from './components/contact-list.js';
import SearchBar from './components/search-bar.js';
import Button from './components/button.js';
import axios from 'axios';

const data = {
  contacts: [
    {
      _id: 1,
      name: '',
      occupation: '',
      avatar: ''
    },
  ]
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      query: '',
      selected: ['No Contacts Selected']
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        data.contacts = resp.data;
        this.setState({
          data
        });
      })
      .catch(err => {
        console.log(`Error! ${err}`);
      });
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
    let result = this.state.data.contacts.filter( function (obj) {
      return obj._id == value;
    });

    result = result[0];

    if (result) {
      result.isSelected ? result.isSelected = false : result.isSelected = true;
      this.setState(
      {result}
      );
    }

  }

  getFilteredContacts() {
    // Contact.name.toLowerCase().indexOf(term) >= 0 Remove trailing white space and make query lowercase
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
