import React, { Component, PropTypes } from 'react';
import ContactList from './components/ContactList';
import SearchBarContainer from './containers/SearchBarContainer';
import axios from 'axios';
import ContactForm from './components/ContactForm';
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
    this.props.onContactLoad();
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
          <SearchBarContainer />
          <ContactList contacts={this.state.contacts} onContactClick={this.handleContactSelect.bind(this)} />
        </div>
      </DefaultLayout>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onContactLoad: PropTypes.func.isRequired
};

export default App;
