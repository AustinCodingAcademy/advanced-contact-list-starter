import React, { Component } from 'react';
import ContactList from './components/contact-list.js';
import SearchBar from './components/search-bar.js';
import Button from './components/button.js';
import ContactForm from './components/ContactForm.js';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [
        {
          _id: 1,
          name: '',
          occupation: '',
          avatar: ''
        },
      ],
      query: '',
      selected: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          contacts: resp.data
        });
      })
      .catch(err => {
        console.log(`Error! ${err}`);
      });
  }

  handleDeleteContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(resp => {
        const newContacts = this.state.contacts.filter(contact => contact._id !== _id);
        this.setState({
          contacts: newContacts
        });
      })
      .catch(err => console.log(`ERROR! ${err}`));
  }

  testrun() {

  }

  render() {
    return (
      <div className="App">
        <h1>
          <ContactForm onSubmit={this.handleNewContact.bind(this)}/>
          <SearchBar value={this.state.query} handleSearch={this.handleSearch.bind(this)} />
          <ContactList data={this.getFilteredContacts()} onDeleteContact={this.handleDeleteContact.bind(this)} handleSelect={this.handleSelect.bind(this)} searchValue={this.state.query} />
        </h1>
        <h1>Selected Contacts </h1>
        <ContactList data={this.getSelectedContacts()} onDeleteContact={this.handleDeleteContact.bind(this)} handleSelect={this.handleSelect.bind(this)} searchValue={this.state.query}  />
        <Button onClick={this.resetSelection.bind(this)} buttonText={'Reset'} />
      </div>
    );
  }

  resetSelection() {
    this.setState(
        this.state.contacts.map((obj) => {
          obj.isSelected = false;
        })
        );
  }

  handleNewContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
   .then(resp => {
     this.setState({
       contacts: this.state.contacts.concat([resp.data])
     });
   })
   .catch(err => console.log(err));
  }


  handleSearch(value) {
    this.setState({
      query: value
    });
  }

  handleSelect(value) {
    let result = this.state.contacts.filter( function (obj) {
      return obj._id === value;
    });

    result = result[0];
    const newSelection = this.state.selected;

    if (newSelection.indexOf(result._id) < 0) {
      newSelection.push(result._id);
    } else {
      newSelection.splice(this.state.selected.indexOf(result._id),1);
    }
    this.setState({
      selected: newSelection
    }
    );

  }

  getFilteredContacts() {
    // Contact.name.toLowerCase().indexOf(term) >= 0 Remove trailing white space and make query lowercase
    const term = this.state.query.trim().toLowerCase();
    // Filter contact list to return array of contacts that match search
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0 && (this.state.selected.indexOf(contact._id) < 0);
    });
  }

  getSelectedContacts() {
    const term = this.state.query.trim().toLowerCase();
    // Filter contact list to return array of contacts that are not selected
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0 && (this.state.selected.indexOf(contact._id) >= 0);
    });
  }


}
