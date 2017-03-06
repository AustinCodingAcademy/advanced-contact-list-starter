/* eslint-disable max-len */
/* eslint-disable no-console */

import React, { Component } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './SearchBar';
// import SearchBarContainer from './containers/SearchBarContainer'
import axios from 'axios';
// import ContactForm from './components/ContactForm'
// import DefaultLayout from './components/layouts/DefaultLayout'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: []
                // query: '',
                // selectedContactIds: []
    };
  }

    // componentWillMount() {
    //   console.log('componentWillMount')
    // }

    // handleSearchString(value) {
    //   this.setState({
    //     query: value
    //   })
    // }

  componentDidMount() {
    console.log('componentDidMount');
            // this.setState({
            //   loading: true
            // })

            // axios.get in a then/catch promise statement 
    axios.get('http://localhost:4000/contacts')
                .then(response => {
                  this.setState({
                    contacts: response.data
                  });
                })
                .catch(error => {
                  console.log(`You Have An Error! ${error}`);
                });
  }
        // .then((result) => {
        //   console.log('Loading successful', result)
        //   this.setState({
        //     loading: false,
        //     contacts: result.data
        //   })
        // }).catch(() => {
        //   console.log('Handle error')
        //   this.setState({
        //     errorMessage: 'Loading failed',
        //     loading: false
        //   })
        // })

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.state.contacts;

    if (!term) {
      return contacts;
    }
    return contacts.filter(contact => {
      return contact.name.toLowerCase().search(term) >= 0;
    });
  }

    // handleContactSelect(contact) {
    //   const newSelectedIds = [
    //     ...this.state.selectedContactIds,
    //     contact._id
    //   ]

    //   this.setState({
    //     selectedContactIds: newSelectedIds
    //   })
    // }

    // handleFormSubmit(values) {
    //   console.log('Handle submit', values)
    //   axios.post('http://localhost:4000/contacts', values)
    //     .then(result => {
    //       console.log('Successfully saved', result)
    //     })
    //     .catch(() => {
    //       console.error('Error')
    //     })
    // }

  render() {
    return ( 
      <div className="App" >
        <SearchBar value={this.state.searchText}
          onChange={this.handleChange.bind(this)}
        />
        <ContactList contacts={this.getFilteredContacts()}
        />
      </div>
    );
  }
}
