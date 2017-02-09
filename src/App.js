import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import axios from 'axios';
import ContactForm from './ContactForm';
import DefaultLayout from './components/layouts/DefaultLayout';

/* eslint-disable max-len */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      contacts: [],
      selectedContactIds: []
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  handleSearchString(value) {
    this.setState({
      query: value
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.setState({
      loading: true
    });
    axios.get('http://localhost:4000/contacts')
      .then((result) => {
        console.log('Loading successful', result);
        this.setState({
          loading: false,
          contacts: result.data
        });
      }).catch(() => {
        console.log('Handle error');
        this.setState({
          errorMessage: 'Loading failed',
          loading: false
        });
      });
  }

  handleContactSelect(contact) {
    const newSelectedIds = [
      ...this.state.selectedContactIds,
      contact._id
    ];

    this.setState({
      selectedContactIds: newSelectedIds
    });
  }

  handleFormSubmit(values) {
    console.log('Handle submit', values);
    axios.post('http://localhost:4000/contacts', values)
      .then(result => {
        console.log('Successfully saved', result);
      })
      .catch(() => {
        console.error('Error');
      });
  }

  render() {
    return (
      <DefaultLayout>
        <div className="App">
          <h1>
            Contact List!
          </h1>
          <ContactForm onSubmit={this.handleFormSubmit.bind(this)} />
          <SearchBar onChange={this.handleSearchString.bind(this)} />
          <ContactList contacts={this.state.contacts} onContactClick={this.handleContactSelect.bind(this)} />
        </div>
      </DefaultLayout>
    );
  }
}

export default App;
