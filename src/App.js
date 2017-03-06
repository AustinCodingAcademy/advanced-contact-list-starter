/* eslint-disable max-len */
/* eslint-disable no-console */

import React, { Component } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './SearchBar';
// import SearchBarContainer from './containers/SearchBarContainer';
import axios from 'axios';
// import DefaultLayout from './components/layouts/DefaultLayout'

export default class App extends Component {
  constructor(props) {
    super(props);

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
          searchText: this.state.searchText,
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

  handleAddContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(response => {
        this.setState({
          contacts: [...this.state.contacts, response.data]
        });
      })
      .catch(error => console.log(`You have an Error! ${error}`));
  }

  handleDeleteContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(response => {
        const newContacts = this.state.contacts.filter(contact => contact._id !== _id);
        
        this.setState({
          contacts: newContacts
        });
      })
      .catch(error => console.log(`You have an ERROR! ${error}`));
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
      <div className="App">
        <ContactForm onSubmit={this.handleAddContact.bind(this)} />
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
        <ContactList contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}
