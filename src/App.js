import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import ActionLog from './ActionLog';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      selectedContactIds: [],
      contacts: [],
      actionLog: []
    };
  }


// ---------Axios HTTP request function--------- //

  componentDidMount() {
    axios.get('/contacts')
      // GET request to retreive contact list (array of objects) that are
      // in db.json file accessed via port 3001
      .then(resp => {
        // Then callback is passed for a successful request
        this.setState({
          searchText: this.state.searchText,
          contacts: resp.data
          // data is the JSON response, and is the key of the object
        });
      })
      .catch(err => console.error(`Error! ${err}`));
        // Catch callback is passed for a bad/errored request
  }


// ---------Search Bar function--------- //

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }


// ---------Reset button function--------- //

  handleResetButtonClick() {
    // When the reset button is clicked, the state will be set to an
    // empty array of selectedContactIds and an empty string for searchText,
    // which will re-render the DOM to the initial state of the app
    this.setState({
      selectedContactIds: [],
      searchText: ''
    });
  }


// ---------Contact List filter function--------- //

  getFilteredContacts() {
    // Removes any white space (trim), and converts searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();

    // Filter will return a NEW array of contacts, the contact will
    // be included in the array if the function returns true, and
    // the contact will be excluded if the function returns false
    return this.state.contacts.filter(contact => {
      return (contact.name.toLowerCase().indexOf(term) >= 0) &&
      (this.state.selectedContactIds.indexOf(contact._id) < 0);
    });
  }


// ---------Selected Contact List functions--------- //

  getSelectedContacts() {
    // The getSelectedContacts function filters the contacts array,
    // looks for the key _id: in the contact object by using indexOf,
    // and returns the id of the contact that was selected
    return this.state.contacts.filter((contact) => {
      return this.state.selectedContactIds.indexOf(contact._id) >= 0;
    });
  }

  handleOnClickSelectedContacts(id) {
    const contactArray = (this.state.contacts.map(contact => {
      return contact._id;
    }));

    // Props id is passed into the click function, and the id is pushed
    // to the selectedContactIds array.
    this.setState({
      selectedContactIds: [...this.state.selectedContactIds, id],
      actionLog: this.state.actionLog
        .concat(`Selected ${(this.state.contacts[contactArray.indexOf(id)].name)},
        ${(this.state.contacts[contactArray.indexOf(id)].occupation)}`)
    });
  }

  handleOnClickDeSelectedContacts(id) {
    const contactArray = (this.state.contacts.map(contact => {
      return contact._id;
    }));
    console.log(contactArray);

    // When you click on a contact in the searchable contact list,
    // it is removed from that list and appears in the Selected
    // Contact List
    this.state.selectedContactIds.splice(this.state.selectedContactIds.indexOf(id), 1);
    this.setState({
      selectedContactIds: this.state.selectedContactIds,
      actionLog: this.state.actionLog
        .concat(`Removed ${this.state.contacts[id - 1].name},
        ${this.state.contacts[id - 1].occupation}`)
    });
  }


// ---------Selected Contact List - No Contacts Selected - function--------- //

  checkForSelectedContacts() {
    // If the length of the selectedContactIds array is equal to zero
    // (i.e. there are no ids in the array - meaning the array is empty),
    // then return message "no contacts selected"
    if (this.state.selectedContactIds.length === 0) {
      return <h3 className="noContact">No Contacts Selected</h3>;
    }
  }


// ---------Axios HTTP Post/Delete (add/delete) functions--------- //

  handleAddContact(attributes) {
    // Adds contact to Contact List with data entered into form
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: this.state.contacts.concat([resp.data])
        });
      })
      .catch(err => console.error(err));
  }


  handleDeleteContact(_id) {
    // Deletes contact from either Contact List or Selected Contact List
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(resp => {
        const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

        this.setState({
          contacts: newContacts
        });
      })
      .catch(err => console.error(`ERROR! ${err}`));
  }


// ---------Action Log functions--------- //

  deleteAction(log) {
    // Deletes action out of the ActionLog
    this.state.actionLog.splice(this.state.actionLog.indexOf(log), 1);
    this.setState({
      deleteAction: this.state.deleteAction
    });
  }

  resetLog() {
    // Reset so that ActionLog is an empty array
    this.setState({
      actionLog: []
    });
  }


// ---------Renders to the DOM--------- //

  render() {
    return (
      <div className="row">

        <div className="row Title">
          <div className="App col-lg-12">
            <h1 className="Title">Contact List</h1>
            <SearchBar
              value={this.state.searchText}
              onChange={this.handleSearchBarChange.bind(this)}
            />
            <button className="Reset"
              onClick={this.handleResetButtonClick.bind(this)}>Reset Contacts
            </button>
          </div>
        </div>

        <div className="row Middle col-lg-12">
          <div className="Middle1 col-lg-4">
            <h1>Add a New Contact</h1>
            <ContactForm
              onSubmit={this.handleAddContact.bind(this)}
            />

            <h1>Action history</h1>
            <div className="ActionLog">
              <ActionLog
                actionLog={this.state.actionLog}
                onDeleteAction={this.deleteAction.bind(this)}
              />
            </div>
            <button className="ResetLog"
              onClick={() => this.resetLog()}>Reset History
            </button>
          </div>

          <div className="Middle2 col-lg-4">
            <h1>Contacts</h1>
            <ContactList
              contacts={this.getFilteredContacts()}
              onClick={this.handleOnClickSelectedContacts.bind(this)}
              onDeleteContact={this.handleDeleteContact.bind(this)}
            />
          </div>

          <div className="Middle3 col-lg-4">
            <h1>Selected Contacts</h1>
            <ContactList
              contacts={this.getSelectedContacts()}
              onClick={this.handleOnClickDeSelectedContacts.bind(this)}
              noContacts={this.checkForSelectedContacts()}
              onDeleteContact={this.handleDeleteContact.bind(this)}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
