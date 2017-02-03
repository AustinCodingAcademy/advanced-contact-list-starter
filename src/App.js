import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();

        this.state = {
            searchText: '',
            contacts: []
        };
    }

    componentDidMount() {
      axios.get('http://localhost:4000/contacts')
        .then(resp => {
          this.setState({
            contacts: resp.data
          })
        })
        .catch(err => {
          console.log(`Error! ${err}`)
        })
    }

    handleSearchBarChange(event) {
        this.setState({
            contacts: this.state.contacts,
            searchText: event.target.value
        });
    }

    addToFavorites() {
        /*if(!this.state.favorite) {
          this.setState({
            favorite: true
          });
        } else {
          this.setState({
            favorite: false
          });
        }
        this.setState({
            favorite: true
        });*/
    }

    getFavorites() {
        let favs = this.getFilteredContacts();
        return favs.filter(contact => {
            return contact.favorite === true;
        });
    }

    getContacts() {
        let cons = this.getFilteredContacts();
        return cons.filter(contact => {
            return contact.favorite === false;
        });
    }

    getFilteredContacts() {
        const term = this.state.searchText.trim().toLowerCase();
        const contacts = this.state.contacts;

        if (!term) {
            return contacts;
        }

        return this.state.contacts.filter(contact => {
            return contact.name.toLowerCase().indexOf(term) >= 0;
        });
    }

    render() {
        return (
          <div className="App">
            <SearchBar
              value={this.state.searchText}
              onChange={this.handleSearchBarChange.bind(this)}
            />
            <ContactList
              contacts={this.getFilteredContacts()}
              listName='Contacts'
              buttonText='Fav'
              onClick={this.addToFavorites()}
            />
            <ContactList contacts={this.getFavorites()}
              listName='Favorites'
              buttonText='Unfav'
              onClick={this.addToFavorites()}
            />
          </div>
        );
    }
}

export default App;
