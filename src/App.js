import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import SelectedContactList from './SelectedContactList';
import ResetButton from './ResetButton';


/* eslint-disable max-len */
class App extends Component {
  constructor(props) {
    super(props);

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
          occupation: 'Adventurer',
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
        },
        {
          _id: 6,
          name: 'Beyonce',
          occupation: 'Singer',
          avatar: 'http://media1.policymic.com/site/article-items/27957/2_gif.gif'
        },
        {
          _id: 7,
          name: 'Henry Cavill',
          occupation: 'Actor',
          avatar: 'https://s-media-cache-ak0.pinimg.com/originals/c1/2c/e6/c12ce6d7e4b9987024996bc5c8dbc82c.jpg'
        },
        {
          _id: 8,
          name: 'Katya Zamolodchikova',
          occupation: 'Drag Queen',
          avatar: 'https://static1.squarespace.com/static/547384c2e4b080be34ce3327/t/547d264ce4b07da997f79d14/1417487950751/Katya_2014_SMJ_08.jpg?format=2500w'
        },
        {
          _id: 9,
          name: 'Carrie Fisher',
          occupation: 'Bad ass and Space Twin 1',
          avatar: 'https://si.wsj.net/public/resources/images/BN-LN957_STARWA_12S_20151203125155.jpg'
        },
        {
          _id: 10,
          name: 'Mark Hamel',
          occupation: 'Actor and Space Twin 2',
          avatar: 'https://www.sideshowtoy.com/wp-content/uploads/2015/09/MarkHamillGuardiansPremiere_article_story_large.jpg'
        }
      ],
      selectedContacts: []
    };
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSelectContact(contact) {
    const newSelectedContact = [
      ...this.state.selectedContacts,
      contact
    ];

    const newContactsArray = this.state.contacts.filter(contactSelected => contactSelected !== contact);

    this.setState({
      selectedContacts: newSelectedContact,
      contacts: newContactsArray
    });
  }

  handleUnselectContact(selectedContact) {
    const newSelectedContact = [
      ...this.state.contacts,
      selectedContact
    ];

    const newSelectedContactsArray = this.state.selectedContacts.filter(item => item !== selectedContact);

    this.setState({
      contacts: newSelectedContact,
      selectedContacts: newSelectedContactsArray
    });
  }

  resetContacts() {
    this.setState({
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
          occupation: 'Adventurer',
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
        },
        {
          _id: 6,
          name: 'Beyonce',
          occupation: 'Singer',
          avatar: 'http://media1.policymic.com/site/article-items/27957/2_gif.gif'
        },
        {
          _id: 7,
          name: 'Henry Cavill',
          occupation: 'Actor',
          avatar: 'https://s-media-cache-ak0.pinimg.com/originals/c1/2c/e6/c12ce6d7e4b9987024996bc5c8dbc82c.jpg'
        },
        {
          _id: 8,
          name: 'Katya Zamolodchikova',
          occupation: 'Drag Queen',
          avatar: 'https://static1.squarespace.com/static/547384c2e4b080be34ce3327/t/547d264ce4b07da997f79d14/1417487950751/Katya_2014_SMJ_08.jpg?format=2500w'
        },
        {
          _id: 9,
          name: 'Carrie Fisher',
          occupation: 'Bad ass and Space Twin 1',
          avatar: 'https://si.wsj.net/public/resources/images/BN-LN957_STARWA_12S_20151203125155.jpg'
        },
        {
          _id: 10,
          name: 'Mark Hamel',
          occupation: 'Actor and Space Twin 2',
          avatar: 'https://www.sideshowtoy.com/wp-content/uploads/2015/09/MarkHamillGuardiansPremiere_article_story_large.jpg'
        }
      ],
      selectedContacts: []
    });
  }

  getFilteredContacts() {
    // removes any white space before what the user searches for and makes the input all lowercase
    const search = this.state.searchText.trim().toLowerCase();

    // this returns the filtered text the user inputs in the search bar
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().indexOf(search) >= 0;
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Contact List!
        </h1>
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)} />
        <ResetButton
          onResetClick={this.resetContacts.bind(this)}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          /* onRemoveContact={this.handleRemoveContact.bind(this)} */
          onSelectContact={this.handleSelectContact.bind(this)}
        />
        <SelectedContactList
          selectedContacts={this.state.selectedContacts}
          onUnselectContact={this.handleUnselectContact.bind(this)}
        />
      </div>
    );
  }
}

export default App;
