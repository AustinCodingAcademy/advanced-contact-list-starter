import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ShowContactForm from './ShowContactForm';
import NetworkLoadAlert from './NetworkLoadAlert';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

//  my initial state
    this.state = {
      searchText: '',
      selectedIds: [],
      contacts: []
    };
  }

//  Sends GET request to retrieve initial state of contactlist. calls to loadingStart
//  and loadingEnd functions to alert user of network loading event.
  componentDidMount() {

    this.loadingStart();

    axios.get('/contacts')
      .then(resp => {

        this.loadingEnd();

        this.setState({
          contacts: resp.data
        });
      })
      .catch(err => {
        console.error(`Error! ${err}`);
      });
  }

//  sends POST request to add a contact. uses axios to post and calls to the loadingStart
//  and loadingEnd functions to alert user of network loading event.
  handleAddContact(attributes) {

    this.loadingStart();

    axios.post('/contacts', attributes)
      .then(resp => {

        this.loadingEnd();

        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(`Error! ${err}`));
  }

//  sends DELETE request to remove a specific contact whose ID is used to identify which to DELETE
//  calls to loadingStart and loadingEnd fucntions to alert user of network loading event.
  handleDeleteContact(_id) {

    this.loadingStart();

    axios.delete(`/contacts${_id}`)
      .then(resp => {

        this.loadingEnd();

        const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

        this.setState({
          contacts: newContacts
        });
      })
      .catch(err => console.log(`Error! ${err}`));
  }

//  handle functions

//  this handles the search bar change
  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  //  filtering, selecting, getting the selected and clicked function. may have
  //  redunancy here but if I take one function away the app breaks. Still need
  //  to play with this section.
  getFilteredContacts() {
    //  this removes whites space and converts searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();

//  using filter will return a new array of contacts, which will include the
//  if the function returns true and excluded if the function returns false.
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  getSelectedContacts() {

  //  copied returns from filteredContacts
    return this.state.contacts.filter((contact) => {
      return this.state.selectedIds.indexOf(contact._id) >= 0;
    }
  );
  }

  getClickedContacts() {

  //  copied returns from filteredContacts

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(contact._id) >= 0;
    });
  }

  // Props id is passed into the function, and the id is pushed
  // to the selectedContactIds array.
  handleSelectedContacts(_id) {
    this.setState({
      selectedIds: [ ...this.state.selectedIds, _id ]
    });
  }

  //  takes the contact out of selectedIds without reset the whole array.
  //  can't get selected contact to remove from initial contact list onChange
  //  added to the selected list.
  handleDeselectedContacts(id) {
    this.state.selectedIds.splice(this.state.selectedIds.indexOf(id), 1);
    this.setState({
      selectedIds: this.state.selectedIds
    });
  }

  checkForSelectedContacts() {
    // If the length of the selectedContactIds array is equal to zero
    // (i.e. there are no ids in the array - meaning the array is empty),
    // then return message "no contacts selected"
    if (this.state.selectedIds.length === 0) {
      return <h3 className="no-contact"> No Contacts Selected </h3>;
    }
  }

  //  function wired to reset button that sets selectedIds state back to
  //  empty array.
  resetSelectedIds() {
    this.setState({
      selectedIds: []
    });
  }

  //  loading functions

  loadingStart() {
    this.setState({
      Loading: true,
    });
  }
  loadingEnd() {
    this.setState({
      Loading: false,
    });
  }

  render() {
    return (
      <container id="row">
        <div className="App">
          <NetworkLoadAlert Loading={this.state.Loading} />
          <div className="col-lg=6">
            <SearchBar
              value={this.state.searchText}
              onChange={this.handleSearchBarChange.bind(this)} />
            <h1>Contacts</h1>

            <ContactList
              contacts={this.getFilteredContacts()}
              onClick={this.handleSelectedContacts.bind(this)}
              onDelete={this.handleDeleteContact.bind(this)}
              selectedIds={this.state.selectedIds}
            />
            <ContactList contacts={this.getClickedContacts()} />
          </div>
          <div className="col-log-6">
            <h1>Selected Contacts</h1>
            <ContactList
              contacts={this.getSelectedContacts()}
              onClick={this.handleDeselectedContacts.bind(this)}
              noContacts={this.checkForSelectedContacts()}
            />
            <ShowContactForm
              ShowHideForm={this.ShowHideForm}
              handleAddContact={this.handleAddContact.bind(this)}
              contact={this.state.contact}
              handleSubmit={this.handleSubmit}
            />
            <div>
              <button className="reset-button" onClick={() => this.resetSelectedIds()}>Reset</button>
            </div>
          </div>
        </div>
      </container>
    );
  }
}

export default App;
