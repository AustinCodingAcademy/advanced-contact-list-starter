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
                }
            ],
            selectedContacts: []
        };
    }


    handleSearchBarChange(event) {

        this.setState({
            searchText: event.target.value
        });
    }

    getFilteredContacts(contactsArray) {

        const searchTerm = this.state.searchText.trim().toLowerCase();

        return contactsArray.filter(contact => {
            return contact.name.toLowerCase().indexOf(searchTerm) >= 0;
        });

    }

    handleAddToSelectedClick(event) {

        let id = event.target.id;

        console.log("Handle add to selected clicked");

        this.addToSelectedContact(id);
        this.removeContactFromAvailable(id);
    }

    handleRemoveSelectedClick() {

    }

    addToSelectedContact(id) {

        let contact = this.findContactById(id, this.state.contacts);

        this.setState({
            selectedContacts: this.state.selectedContacts.concat(contact)
        });

    }

    removeContactFromAvailable(id) {

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

    findIndexById(id, array) {

        let parsedId = parseInt(id);

        return array.findIndex((contact) => {
            return contact._id === parsedId;
        })

    }


    render() {

        return (
            <div className="App">
                <SearchBar value={this.state.searchText}
                           onChange={this.handleSearchBarChange.bind(this)}/>
                <ContactList
                    title={"Selected Contacts"}
                    contacts={this.getFilteredContacts(this.state.selectedContacts)}
                    handleSelectContactClick={this.handleRemoveSelectedClick.bind(this)}
                />
                <ContactList
                    title={"Available Contacts"}
                    contacts={this.getFilteredContacts(this.state.contacts)}
                    handleSelectContactClick={this.handleAddToSelectedClick.bind(this)}
                />
            </div>
        );
    }

}

export default App;
