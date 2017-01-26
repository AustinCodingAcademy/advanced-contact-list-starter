import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

class App extends Component {

    constructor() {
        super();

        this.state = {
            searchText: '',
            contacts: [
                {
                    _id: 1,
                    name: 'Dale Cooper',
                    occupation: 'FBI Agent',
                    avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg'
                },
                {
                    _id: 2,
                    name: 'Spike Spiegel',
                    occupation: 'Bounty Hunter',
                    avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
                },
                {
                    _id: 3,
                    name: 'Wirt',
                    occupation: 'adventurer',
                    avatar: 'http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg'
                },
                {
                    _id: 4,
                    name: 'Michael Myers',
                    occupation: 'Loving little brother',
                    avatar: 'http://vignette2.wikia.nocookie.net/villains/images/e/e3/MMH.jpg/revision/latest?cb=20150810215746'
                },
                {
                    _id: 5,
                    name: 'Dana Scully',
                    occupation: 'FBI Agent',
                    avatar: 'https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg'
                }
            ]
        };
    }

    handleSearchBarChange(event) {

        console.log("search bar changed");

        this.setState({
            searchText: event.target.value
        });
    }

    getFilteredContacts(){
        //trim the search query and ensure it's the proper case
        const searchTerm = this.state.searchText.trim().toLowerCase();

        //filter the searchTerm into a new array
        return this.state.contacts.filter(contact =>{

            console.log("contacts being filtered");

            return contact.name.toLowerCase().indexOf(searchTerm) >= 0;
        });
    }


    render() {

        return (
            <div className="App">
                <SearchBar value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)}/>
                <ContactList contacts={this.getFilteredContacts()} />
            </div>
        );
    }

}

export default App;
