import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
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
            searchText: this.state.searchText,
            contacts: resp.data
          })
        })
        .catch(err => {
          console.log(`Error! ${err}`)
        })
    }

    handleChange(event) {
        this.setState({
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

    handleAddContact(attributes) {
      axios.post('http://localhost:4000/contacts', attributes)
      .then((resp) => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
    }

    handleDeleteContact(_id) {
      axios.delete(`http://localhost:4000/contacts/${_id}`)
        .then(() => {
          const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

          this.setState({
            contacts: newContacts
          });
        })
        .catch(err => console.log(`ERROR! ${err}`));
    }

    render() {
        return (
          <div className="App">
            <ContactForm onSubmit={this.handleAddContact.bind(this)} />
            <SearchBar
              value={this.state.searchText}
              onChange={this.handleChange.bind(this)}
            />
            <ContactList
              contacts={this.getFilteredContacts()}
              listName='Contacts'
              buttonText='Fav'
              onClick={this.addToFavorites()}
              onClick2={this.handleDeleteContact.bind(this)}
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
