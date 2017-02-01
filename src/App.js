import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';


import axios from 'axios';

class App extends Component {

    constructor() {
        super();

        this.state = {
            searchText: '',
            contacts: [],
            selectedContacts: [],
            backupContacts: [],
        };
    }

    componentDidMount(){

       this.getContacts();

    }

    getContacts(){
        axios.get('http://localhost:4000/contacts')
            .then((response)=>{
                this.setState({
                    contacts: response.data
                });

                this.buildBackup();
            }).catch((err)=>{
            console.log(err);
        })
    }

    buildBackup(){

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
            selectedContacts: [],
            searchText: ''
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
