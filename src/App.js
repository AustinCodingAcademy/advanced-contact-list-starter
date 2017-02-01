import React, {Component} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ActionHistory from './ActionHistory';
import uuid from 'uuid';
import update from 'immutability-helper';
import axios from 'axios';

class App extends Component {

    constructor() {

        super();

        this.state = {
            searchText: '',
            contacts: [],
            selectedContacts: [],
            backupContacts: [],
            actionHistory: [],
        };
    }

    componentDidMount() {

        this.getContacts();

    }

    getContacts() {
        axios.get('http://localhost:4000/contacts')
            .then((response) => {

                this.setState({
                    contacts: response.data
                });

                this.buildBackup();

            }).catch((err) => {
            console.log(err);
        })
    }

    buildBackup() {

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
            return contact.name.toLowerCase().indexOf(searchTerm) >= 0;
        });

    }

    handleAddToSelectedClick(event) {

        let id = event.target.id;

        this.addSelectedContact(id);
        this.removeAvailableContact(id);

        const addedContact = this.findContactById(id, this.state.contacts);
        this.addActionToHistory(`Added ${addedContact.name} to selected contacts`)
    }

    handleRemoveSelectedClick(event) {

        let id = event.target.id;

        this.addAvailableContact(id);
        this.removeSelectedContact(id);

        const removedContact = this.findContactById(id, this.state.selectedContacts);
        this.addActionToHistory(`Removed ${removedContact.name} from selected contacts`)

    }

    addSelectedContact(id) {

        let contact = this.findContactById(id, this.state.contacts);

        this.setState({
            selectedContacts: this.state.selectedContacts.concat(contact)
        });

        return contact;
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

        return contact;
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

    reset() {

        this.setState({
            contacts: Object.assign([], this.state.backupContacts),
            selectedContacts: [],
            searchText: '',
            actionHistory: []
        });

        this.addActionToHistory("Reset application");
    }

    addActionToHistory(description) {

        const newAction = this.buildNewAction(description);

        //Using immutability helper to return new array.
        let newState = update(this.state.actionHistory, {$unshift: [newAction]});

        this.setState({
            actionHistory: newState.slice(0, 9)
        })

    }

    handleRemoveActionFromHistoryClick(event, id) {
        console.log(id);

        this.setState({
            actionHistory: this.state.actionHistory.filter((action) =>{
                return action._id !== id;
            })
        });

    }

    buildNewAction(description) {

        const action = {
            description: description || 'A default action',
            _id: uuid.v4(),
        };

        return action;
    }


    render() {

        return (
            <div className="App">
                <SearchBar value={this.state.searchText}
                           onChange={this.handleSearchBarChange.bind(this)}/>
                <button
                    className="reset-button"
                    onClick={this.reset.bind(this)}
                >Reset
                </button>
                <ActionHistory
                    actions={this.state.actionHistory}
                    removeAction={this.handleRemoveActionFromHistoryClick.bind(this)}
                />
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

            </div>
        );
    }

}

export default App;
