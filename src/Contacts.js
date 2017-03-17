/* eslint-disable max-len */
/* eslint-disable no-console */

import React from 'react';
// import ContactList from './components/ContactList';
// import ContactForm from './components/ContactForm';
// import SearchBar from './SearchBar';
// import SearchBarContainer from './containers/SearchBarContainer';
// import axios from 'axios';
// import DefaultLayout from './components/layouts/DefaultLayout'
import { Link } from 'react-router-dom';

const Contact = (props) => {
  return (
    <Link to={`/profile/${props.id}`} className="contact-link">
      <li className="contact">
        <div className="image-cropper">
          <img src={props.avatar} alt="avatar" />
        </div>
        <div className="contact-info">
          <h2>{props.name}</h2>
          {props.occupation}
        </div>
      </li>
    </Link>
  );
};

Contact.propTypes = {
  id: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired
};

export default Contact;






// export default class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       searchText: '',
//       contacts: []
      // query: '',
      // selectedContactIds: []
  //   };
  // }

    // componentWillMount() {
    //   console.log('componentWillMount')
    // }

    // handleSearchString(value) {
    //   this.setState({
    //     query: value
    //   })
    // }

  // componentDidMount() {
  //   console.log('componentDidMount');
    // this.setState({
    //   loading: true
    // })

// axios.get in a then/catch promise statement
  //   axios.get('/contacts')
  //     .then(response => {
  //       this.setState({
  //         searchText: this.state.searchText,
  //         contacts: response.data
  //       });
  //     })
      
  //     .catch(error => {
  //       console.log(`Error in App axios.get! ${error}`);
  //     });
  // }

        // .then((result) => {
        //   console.log('Loading successful', result)
        //   this.setState({
        //     loading: false,
        //     contacts: result.data
        //   })
        // }).catch(() => {
        //   console.log('Handle error')
        //   this.setState({
        //     errorMessage: 'Loading failed',
        //     loading: false
        //   })
        // })

  // handleChange(event) {
  //   this.setState({
  //     searchText: event.target.value
  //   });
  // }

  // getFilteredContacts() {
  //   const term = this.state.searchText.trim().toLowerCase();
  //   const contacts = this.state.contacts;

  //   if (!term) {
  //     return contacts;
  //   }
  //   return contacts.filter(contact => {
  //     return contact.name.toLowerCase().search(term) >= 0;
  //   });
  // }

  // handleAddContact(attributes) {
  //   axios.post('http://localhost:4000/contacts', attributes)
  //     .then(response => {
  //       this.setState({
  //         contacts: [...this.state.contacts, response.data]
  //       });
  //     })
  //     .catch(error => console.log(`You have an Error! ${error}`));
  // }

  // handleDeleteContact(_id) {
  //   axios.delete(`http://localhost:4000/contacts/${_id}`)
  //     .then( () => {
  //       const newContacts = this.state.contacts.filter(contact => contact._id !== _id);
        
  //       this.setState({
  //         contacts: newContacts
  //       });
  //     })
  //     .catch(error => console.log(`You have an ERROR! ${error}`));
  // }

  //     handleContactSelect(contact) {
    //   const newSelectedIds = [
    //     ...this.state.selectedContactIds,
    //     contact._id
    //   ]

    //   this.setState({
    //     selectedContactIds: newSelectedIds
    //   })
    // }

    // handleFormSubmit(values) {
    //   console.log('Handle submit', values)
    //   axios.post('http://localhost:4000/contacts', values)
    //     .then(result => {
    //       console.log('Successfully saved', result)
    //     })
    //     .catch(() => {
    //       console.error('Error')
    //     })
    // }

//   render() {
//     return (
//       <div className="App">
//         <ContactForm onSubmit={this.handleAddContact.bind(this)} />
//         <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
//         <ContactList contacts={this.getFilteredContacts()} />
//       </div>
//     );
//   }
// }


// Express modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contact-list');

app.use(bodyParser.json());

const PORT = 3001;

app.listen(PORT, function (error, request, response) {
  return response.status(500).send('Uh oh! Something went wrong!' + error);
});

app.listen(PORT, function (error) {
  if (error) {
    return console.log('You Have An Error!', error);
  }
  return console.log('Listening on: http://localhost:' + PORT);
});
