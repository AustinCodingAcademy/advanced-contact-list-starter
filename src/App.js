import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';


import axios from 'axios';

class App extends Component {

    constructor() {
        super();

        this.state = {
            searchText: '',
            contacts: [
                {
                    "_id": 1,
                    "name": "Dale Cooper",
                    "occupation": "FBI Agent",
                    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
                },
                {
                    "_id": 2,
                    "name": "Spike Spiegel",
                    "occupation": "Bounty Hunter",
                    "avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
                },
                {
                    "_id": 3,
                    "name": "Wirt",
                    "occupation": "adventurer",
                    "avatar": "http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg"
                },
                {
                    "_id": 4,
                    "name": "Michael Myers",
                    "occupation": "Loving little brother",
                    "avatar": "http://vignette2.wikia.nocookie.net/villains/images/e/e3/MMH.jpg/revision/latest?cb=20150810215746"
                },
                {
                    "_id": 5,
                    "name": "Dana Scully",
                    "occupation": "FBI Agent",
                    "avatar": "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
                },
                {
                    "_id": 6,
                    "name": "Boba Fett",
                    "occupation": "A Better Bounty Hunter",
                    "avatar": "https://upload.wikimedia.org/wikipedia/en/3/3e/FettbobaJB.png"
                },
                {
                    "_id": 7,
                    "name": "Tiny Rick",
                    "occupation": "Being trapped in bodies",
                    "avatar": "http://vignette2.wikia.nocookie.net/rickandmorty/images/2/23/TinyRick.png/revision/latest/scale-to-width-down/250?cb=20150914183331&format=webp"
                },
                {
                    "_id": 8,
                    "name": "Morty",
                    "occupation": "Wacky Adventures",
                    "avatar": "https://i.ytimg.com/vi/Zw1Du7OmoU8/maxresdefault.jpg"
                }
            ],
            selectedContacts: [],
            backupContacts: [],
        };
    }

    componentWillMount(){

        //build a backup of contacts to enable resetting
        this.setState({
            backupContacts: Object.assign([], this.state.contacts)
        })

    }

    handleSearchBarChange(event) {

        this.setState({
            searchText: event.target.value
        });
    }

    getFilteredContacts(contactsArray) {

        const searchTerm = this.state.searchText.trim().toLowerCase();

        return contactsArray.filter(contact => {
            console.log(contact);
            return contact.name.toLowerCase().indexOf(searchTerm) >= 0;
        });

    }

    handleAddToSelectedClick(event) {

        let id = event.target.id;

        this.addSelectedContact(id);
        this.removeAvailableContact(id);
    }

    handleRemoveSelectedClick(event) {

        let id = event.target.id;

        this.addAvailableContact(id);
        this.removeSelectedContact(id);
    }

    addSelectedContact(id) {

        let contact = this.findContactById(id, this.state.contacts);

        this.setState({
            selectedContacts: this.state.selectedContacts.concat(contact)
        });
    }

    removeSelectedContact(id) {

        let parsedId = parseInt(id);

        this.setState({
            selectedContacts: this.state.selectedContacts.filter((contact) => {
                return contact._id !== parsedId;
            })
        })
    }

    addAvailableContact(id) {

        let contact = this.findContactById(id, this.state.selectedContacts);

        this.setState({
            contacts: this.state.contacts.concat(contact)
        });
    }

    removeAvailableContact(id) {

        let parsedId = parseInt(id);

        this.setState({
            contacts: this.state.contacts.filter((contact) => {
                return contact._id !== parsedId;
            })
        })

    }

    findContactById(id, array) {

        let parsedId = parseInt(id);

        return array.find((contact) => {
            return contact._id === parsedId;
        })
    }

    reset(){
        this.setState({
            contacts: Object.assign([], this.state.backupContacts),
            selectedContacts: []
        });
    }


    render() {

        return (
            <div className="App">
                <SearchBar value={this.state.searchText}
                           onChange={this.handleSearchBarChange.bind(this)}/>
                <ContactList
                    value={this.state.searchText}
                    title={this.state.selectedContacts.length > 0 ? "Selected Contacts" : "No selected contacts"}
                    contacts={this.getFilteredContacts(this.state.selectedContacts)}
                    handleSelectContactClick={this.handleRemoveSelectedClick.bind(this)}
                />
                <ContactList
                    value={this.state.searchText}
                    title={"Available Contacts"}
                    contacts={this.getFilteredContacts(this.state.contacts)}
                    handleSelectContactClick={this.handleAddToSelectedClick.bind(this)}
                />
                <button
                    className="reset-button"
                    onClick={this.reset.bind(this)}
                >Reset
                </button>
            </div>
        );
    }

}

export default App;
