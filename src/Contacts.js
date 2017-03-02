import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import Activity from './Activity';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();

        this.state = {
            searchText: '',
            favorites: [],
            contacts: [],
            activity: [],
            contactFormVisible: false
        };
    }

    componentDidMount() {
      axios.get('/contacts')
        .then(resp => {
          this.setState({
            searchText: this.state.searchText,
            contacts: resp.data
          })
        })
        .catch(err => {
          console.log(`Error! ${err}`)
        })
      axios.get('/favorites')
        .then(resp => {
          this.setState({
            favorites: resp.data
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

    addToFavorites(_id) {
        let addCon = this.state.contacts.filter(contact => contact._id === _id);
        //let newActivity = this.state.activity.push(addCon.name + " added to favorites");
        console.log(addCon);

        this.handleAddFavorite(...addCon);
        this.handleDeleteContact(_id);
    }

    removeFromFavorite(_id) {
      let remCon = this.state.favorites.filter(contact => contact._id === _id);

      console.log(remCon);

      this.handleAddContact(...remCon);
      this.handleDeleteFavorite(_id);
    }

    getFilteredContacts(list) {
        const TERM = this.state.searchText.trim().toLowerCase();
        const CONTACTS = list;

        if (!TERM) {
            return CONTACTS;
        }

        return CONTACTS.filter(contact => {
            return contact.name.toLowerCase().indexOf(TERM) >= 0;
        });
    }

    handleAddContact(attributes) {
      axios.post('/contacts', attributes)
      .then((resp) => {

        console.log(resp.data.name);

        this.setState({
          contacts: [...this.state.contacts, resp.data],
          activity: [...this.state.activity, resp.data.name + " added to contacts"]
        });
      })
      .catch(err => console.log(err));
    }

    handleAddFavorite(attributes) {
      axios.post('/favorites', attributes)
      .then((resp) => {

        console.log(resp.data.name);

        this.setState({
          favorites: [...this.state.favorites, resp.data],
          activity: [...this.state.activity, resp.data.name + " added to favorites"]
        });
      })
      .catch(err => console.log(err));
    }

    handleDeleteContact(_id) {
      axios.delete(`/contacts/${_id}`)
        .then((resp) => {
          const newContacts = this.state.contacts.filter(contact => contact._id !== _id);

          this.setState({
            contacts: newContacts
          });
        })
        .catch(err => console.log(`ERROR! ${err}`));
    }

    handleDeleteFavorite(_id) {
      axios.delete(`/favorites/${_id}`)
        .then(() => {
          const newFavorites = this.state.favorites.filter(contact => contact._id !== _id);

          this.setState({
            favorites: newFavorites
          });
        })
        .catch(err => console.log(`ERROR! ${err}`));
    }

    showContactForm() {
      this.setState({
        contactFormVisible: true
      });
    }

    hideContactForm() {
      this.setState({
        contactFormVisible: false
      });
    }

    render() {
        return (
          <div className="App">
            <div>
              <h1>React Contact List</h1>
            </div>
            <Activity
              activity={this.state.activity}
            />
            <SearchBar
              value={this.state.searchText}
              onChange={this.handleChange.bind(this)}
              showForm={this.showContactForm.bind(this)}
            />
            <div id="show-form" onClick={this.showContactForm.bind(this)}><span className="fa fa-plus"></span></div>

            { this.state.contactFormVisible ? <ContactForm hideForm={this.hideContactForm.bind(this)} onSubmit={this.handleAddContact.bind(this)} /> : null }
            <div>
              <ContactList
                contacts={this.getFilteredContacts(this.state.contacts)}
                listName='Contacts'
                buttonText="fa fa-heart-o"
                handleFav={this.addToFavorites.bind(this)}
                handleDelete={this.handleDeleteContact.bind(this)}
              />
              <ContactList
                contacts={this.getFilteredContacts(this.state.favorites)}
                listName='Favorites'
                buttonText="fa fa-heart"
                handleFav={this.removeFromFavorite.bind(this)}
                handleDelete={this.handleDeleteFavorite.bind(this)}
              />
            </div>
          </div>
        );
    }
}

export default App;
