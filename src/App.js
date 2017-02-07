import React, { Component } from "react";

//first I gotta npm install axios and then import it
//WHICH WAS A HUGE PAIN ON WINDOWS 10 AND I WASTED MY LIFE
import axios from "axios";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import ContactForm from "./ContactForm";

//Our app is now way souped up with a bunch of architecture
class App extends Component {
  constructor() {
    super();
    //We initialize our state with 2 properties
    //We have an empty search bar and an empty contact list
    this.state = {
      searchText: "",
      contacts: []
    };
  }

  //Now that we have axios we can use componentDidMount to get the information
  //via the json file fake server
  componentDidMount() {
    //using axios.get we can access the json file on the EXPRESS 4000 port server
      axios.get("http://localhost:4000/contacts")
        .then(resp => {
          //We run setState to get our data inside contacts
          this.setState({
            contacts: resp.data
          });
        })
        //here is our catch error message which will display any encountered errors in the console
        .catch(err => console.log(`Error! ${err}`));
    }

    //upon some event (typing) we will set the state of searchText property
  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  //Here is where we filter our contacts given our search term
  getFilteredContacts() {
      //we create a const and give it the value of our input
      //then we trim any whitespace and then we convert to lowercase
      const term = this.state.searchText.trim().toLowerCase();

      //now we run filter, for each "contact" item we see if what has been
      //typed into state matches anything in the contacts; if that index
      //value is greater than ore equal to zero it means that we've got MATCHES
      const filteredContacts = this.state.contacts.filter(contact => {

        //for each matching instance we return a contact into our array
        //If nothing matches we get -1 as the value and nothing gets populated
        return contact.name.toLowerCase().indexOf(term) >= 0;
      });

      //here is our array of filtered contacts for return
      return filteredContacts;
    }
    //My understanding is a little faulty here but this is another event handler
    //it lets us add a contact by using axios.post to access our 4000 server
    //I'm not clear on "attributes"
    handleAddContact(attributes) {
      axios.post('http://localhost:4000/contacts', attributes)
        .then(resp => {
          //We use this.setState to concatinate our attributes into a new contact
          this.setState({
            contacts: this.state.contacts.concat([resp.data])
          });
        })
        .catch(err => console.log(err));
    }
    //Finally we have the app render that will go to ReactDOM.render
  render() {
    //We will give it our Contact Form, followed by our SearchBar and our ContactList
      return (
      <div className="App">
        //here's where we use all the event handlers we made

        //our first event is an onSubmit where we pass in our handler (bound to the constructor)
        <ContactForm onSubmit={this.handleAddContact.bind(this)} />
        //next is our searchbar which will setstate for any changes inside the bar
        //The first thing we pass it is our event handler which will happen onChange
        //It is bound to the app constructor; the next thing we pass is our state value
        <SearchBar onChange={this.handleSearchBarChange.bind(this)} value={this.state.searchText}/>

        //finally we have our contact list which must be passed our currently filtered contacts list
        <ContactList contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}
export default App;
