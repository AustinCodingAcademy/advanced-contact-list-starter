import React, { Component } from 'react';
import ActionLog from './ActionLog';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import axios from 'axios';

/* eslint-disable max-len */
class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedContactIds: [],
      actionLog: [],
      searchText: '',
      contacts: []
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
      console.error(`Error! ${err}`);
    });
  }
  componentDidUpdate() {
    if (this.state.actionLog.length === 10) {
      this.state.actionLog.shift();
    }
  }
  handleAddContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data],
          actionLog: [...this.state.ActionLog, `Added ${resp.data.name}, ${resp.data.occupation}`]
        });
      })
      .catch(err => {
        console.error(`Error ${err}`);
      });
  }
  handleDeleteContact(_id) {
    const contArr = (this.state.contacts.map(contact => {
      return contact._id;
    }));
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(resp => {
        const newContacts = this.state.contacts.filter(contact => contact._id !== _id);
        this.setState({
          contacts: newContacts,
          actionLog: [...this.state.actionLog,
            `Permanently deleted ${this.state.contacts[contArr.indexOf(_id)].name},
          ${this.state.contacts[contArr.indexOf(_id)].occupation}`]
        });
      })
      .catch(err => console.error(`ERROR! ${err}`));
  }
  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }
  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const selectedIds = this.state.selectedContactIds;
    return this.state.contacts.filter(
      (contact) => {
        return (( contact.name.toLowerCase().indexOf(term) >= 0) &&
        (selectedIds.indexOf(contact._id) < 0));
      });
  }
  getSelectedContacts() {
    return this.state.contacts.filter(
      (contact) => {
        return this.state.selectedContactIds.indexOf(contact._id) >= 0;
      });
  }
  handleSelectedContact(id) {
    const contArr = (this.state.contacts.map(contact => {
      return contact._id;
    }));
    this.setState({
      selectedContactIds: this.state.selectedContactIds.concat(id),
      actionLog: [...this.state.actionLog,
      (`Selected ${(this.state.contacts[contArr.indexOf(id)].name)},
      ${(this.state.contacts[contArr.indexOf(id)].occupation)}`)]
    });
  }
  handleDeselectedContact(id) {
    const contArr = (this.state.contacts.map(contact => {
      return contact._id;
    }));
    this.state.selectedContactIds.splice(this.state.selectedContactIds.indexOf(id), 1);
    this.setState({
      selectedContactIds: this.state.selectedContactIds,
      actionLog: [...this.state.actionLog,
      (`Deselected ${this.state.contacts[contArr.indexOf(id)].name},
      ${this.state.contacts[contArr.indexOf(id)].occupation}`)]
    });
  }
  resetSelectedIds() {
    this.setState({
      selectedContactIds: [],
      actionLog: [...this.state.actionLog, ('Contacts reset')]
    });
  }
  deleteLog(log) {
    this.state.actionLog.splice(this.state.actionLog.indexOf(log), 1);
    this.setState({
      actionLog: this.state.actionLog
    });
  }
  clearLogs() {
    this.setState({
      actionLog: []
    });
  }
  noSelectedContacts() {
    if (this.state.selectedContactIds.length === 0 ) {
      return <h2 className="noContacts"> To select a contact, click the picture</h2>;
    }
  }
  fetchingContact() {
    if (this.state.contacts.length === 0) {
      return <h2 className="noContacts">Loading...</h2>;
    }
  }

  render() {
    return (
      <div className="row-containers">
        <div className="row submitRow">
          <div className="App col-xs-12">
            <ContactForm onSubmit={this.handleAddContact.bind(this)} />
          </div>
        </div>
        <div className="row appRow">
          <div className="App col-xs-7">
            <p>Contacts</p>
            <SearchBar
              value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)}
            />
            <ContactList
              contacts={this.getFilteredContacts()}
              clickHandle={this.handleSelectedContact.bind(this)}
              permDelete={this.handleDeleteContact.bind(this)}
              noContacts={this.fetchingContact()}
            />
            <p>Selected Contacts</p>
            <ContactList
              contacts={this.getSelectedContacts()}
              clickHandle={this.handleDeselectedContact.bind(this)}
              permDelete={this.handleDeleteContact.bind(this)}
              noContacts={this.noSelectedContacts()}
            />
            <button className="my-btn" onClick={() => this.resetSelectedIds()}>Reset</button>
          </div>
          <div className="actionLogContainer col-xs-5">
            <p>Action Log</p>
            <div className="actionlog">
              <ActionLog
                actionLog={this.state.actionLog}
                clickHandle={this.deleteLog.bind(this)}
            />
              <button className="my-btn" onClick={() => this.clearLogs()}>Clear Logs</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
