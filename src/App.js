import React, { Component, PropTypes } from 'react';
import ContactList from './components/ContactList/ContactList';
import SearchBarContainer from './containers/SearchBarContainer';
import SelectedContactsList from './components/SelectedContactsList/SelectedContactsList';
import ResetButton from './components/ResetButton/ResetButton';
import axios from 'axios';
import ContactForm from './components/ContactForm/ContactForm';
import ActionHistoryList from './components/ActionHistoryList/ActionHistoryList';
import { BrowserRouter, Route } from 'react-router-dom';

/* eslint max-len: [1, {"ignoreUrls": true}] */

// let actionHistoryIterator = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      selectedContacts: [],
      contacts: [],
      actionHistory: []
    };
  }

  handleAddContact(attributes) {
    const addHistoryItem = [{
      itemText: `${attributes.name} has been added to Contacts List!`,
      // _id: actionHistoryIterator++
    }];

    let newActionHistory = addHistoryItem.concat(this.state.actionHistory);

    if (newActionHistory.length > 10) {
      newActionHistory = newActionHistory.slice(0, 10);
    }

    const requestBody = {
      actionItemText: addHistoryItem[0].itemText
    };

    axios.post('http://localhost:3001/actionhistory', requestBody)
      .then(() => {
        this.getActionHistoryFromDB();
      })
      .catch(err => console.log(err));

    axios.post('http://localhost:3001/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data],
          // actionHistory: newActionHistory
        });
      })
      .catch(err => console.log(err));
  }

  getContactsFromDB() {
    this.props.onContactListLoad();
  }

  getActionHistoryFromDB() {
    axios.get('http://localhost:3001/actionhistory')
      .then(resp => {
        resp.data.sort((a, b) => {
          const idA = a._id;
          const idB = b._id;
          if (idA > idB) {
            return -1;
          }
          if (idA < idB) {
            return 1;
          }
          return 0;
        });
        if (resp.data.length > 10) {
          resp.data = resp.data.slice(0, 10);
        }
        this.setState({
          actionHistory: resp.data
        });
      })
      .catch(err => {
        console.log(`Error! ${err}`);
        alert('ACTION HISTORY ERROR!');
      });
  }

  handleReset() {
    const resetActionItem = [{
      itemText: 'App was reset!',
      // _id: actionHistoryIterator++
    }];

    let newActionHistory = resetActionItem.concat(this.state.actionHistory);

    if (newActionHistory.length > 10) {
      newActionHistory = newActionHistory.slice(0, 10);
    }

    const requestBody = {
      actionItemText: resetActionItem[0].itemText
    };

    axios.post('http://localhost:3001/actionhistory', requestBody)
      .then(() => {
        this.getActionHistoryFromDB();
      })
      .catch(err => console.log(err));

    this.setState({
      searchText: '',
      selectedContacts: [],
      // actionHistory: newActionHistory
    });

    this.forceUpdate(this.getContactsFromDB());
  }

  handleSelectContact(index) {
    const clickedContact = this.state.contacts.filter(
      contact => contact._id === index
    );

    const clickedContactActionItem = [{
      itemText: `
        ${clickedContact[0].name} has been added to Selected Contacts!
      `,
      // _id: actionHistoryIterator++
    }];

    const requestBody = {
      actionItemText: clickedContactActionItem[0].itemText
    };

    axios.post('http://localhost:3001/actionhistory', requestBody)
      .then(() => {
        this.getActionHistoryFromDB();
      })
      .catch(err => console.log(err));

    let newActionHistory = clickedContactActionItem.concat(
      this.state.actionHistory
    );

    if (newActionHistory.length > 10) {
      newActionHistory = newActionHistory.slice(0, 10);
    }

    this.setState({
      contacts: this.state.contacts.filter(contact => contact._id !== index),
      selectedContacts: this.state.selectedContacts.concat(clickedContact),
      // actionHistory: newActionHistory
    });
  }

  checkForSelectedContact() {
    if (this.state.selectedContacts.length === 0) {
      return (
        <p>No contacts selected, I am empty!</p>
      );
    }
  }

  checkForUserActions() {
    if (this.state.actionHistory.length === 0) {
      return (
        <p>You have performed no actions!</p>
      );
    }
  }

  handleDeselectContact(index) {
    const clickedContact = this.state.selectedContacts.filter(
      contact => contact._id === index
    );

    const deselectActionItem = [{
      itemText: `
        ${clickedContact[0].name} has been removed from Selected Contacts!
      `,
      // _id: actionHistoryIterator++
    }];

    let newActionHistory = deselectActionItem.concat(this.state.actionHistory);

    if (newActionHistory.length > 10) {
      newActionHistory = newActionHistory.slice(0, 10);
    }

    const requestBody = {
      actionItemText: deselectActionItem[0].itemText
    };

    axios.post('http://localhost:3001/actionhistory', requestBody)
      .then(() => {
        this.getActionHistoryFromDB();
      })
      .catch(err => console.log(err));

    this.setState({
      contacts: this.state.contacts.concat(clickedContact),
      selectedContacts: this.state.selectedContacts.filter(
        contact => contact._id !== index,
      ),
      // actionHistory: newActionHistory
    });
  }

  handleRemoveContact(event, index) {
    event.stopPropagation();

    const removedContact = this.state.contacts.filter(
      contact => contact._id === index
    );

    const removedActionItem = [{
      itemText: `
        ${removedContact[0].name} was removed from Contact List!
      `,
      // _id: actionHistoryIterator++
    }];

    let newActionHistory = removedActionItem.concat(this.state.actionHistory);

    if (newActionHistory.length > 10) {
      newActionHistory = newActionHistory.slice(0, 10);
    }

    const requestBody = {
      actionItemText: removedActionItem[0].itemText
    };

    axios.post('http://localhost:3001/actionhistory', requestBody)
      .then(() => {
        this.getActionHistoryFromDB();
      })
      .catch(err => console.log(err));

    axios.delete(`http://localhost:3001/contacts/${index}`)
      .then(() => {
        const newContacts = this.state.contacts.filter(
          contact => contact._id !== index
        );

        this.setState({
          contacts: newContacts,
          // actionHistory: newActionHistory
        });
      })
      .catch(err => console.log(err));
  }

  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.props.items;

    if (!term) {
      return contacts;
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  handleClearHistory() {
    this.setState({
      actionHistory: []
    });
  }

  handleRemoveHistoryItem(index) {
    this.setState({
      actionHistory: this.state.actionHistory.filter(
        item => item._id !== index
      )
    });
  }

  componentDidMount() {
    this.getContactsFromDB();
    this.getActionHistoryFromDB();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/helloworld" render={() => <h2>Hello, World!</h2>}
          />
          <Route exact path="/topkek" render={() =>
            <img src="http://i1.kym-cdn.com/entries/icons/original/000/018/784/topkek.png" alt="topkek" />
          } />
          <ResetButton
            onClickReset={this.handleReset.bind(this)}
          />
          <ContactForm onSubmit={this.handleAddContact.bind(this)} />
          <div className="contact-list-components">
            <h1>
              Searchable Contacts List
            </h1>
            <SearchBarContainer />
            <ContactList
              contacts={this.getFilteredContacts()}
              onClickRemove={this.handleRemoveContact.bind(this)}
              onClickSelect={this.handleSelectContact.bind(this)}
              searchText={this.state.searchText}
            />
          </div>
          <div className="selected-contacts-components">
            <h1>
              Selected Contacts
            </h1>
            <SelectedContactsList
              selectedContacts={this.state.selectedContacts}
              onClickDeselect={this.handleDeselectContact.bind(this)}
              checkForSelectedContact={this.checkForSelectedContact()}
            />
          </div>
          <ActionHistoryList
            actionHistory={this.state.actionHistory}
            checkForUserActions={this.checkForUserActions()}
            onClickClearHistory={this.handleClearHistory.bind(this)}
            removeHistoryItem={this.handleRemoveHistoryItem.bind(this)}
          />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // value: PropTypes.string,
  onContactListLoad: PropTypes.func.isRequired,
  items: PropTypes.array,
  isLoading: PropTypes.boolean,
  errorMessage: PropTypes.string
};

export default App;
