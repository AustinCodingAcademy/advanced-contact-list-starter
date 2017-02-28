import React, {Component, PropTypes} from 'react';
import Contact from './Contact';

/* eslint-disable max-len */
export default class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
        {this.props.contacts.map((contact) => <Contact
          key={contact._id}
          name={contact.name}
          avatar={contact.avatar}
          occupation={contact.occupation}
          onButtonClick={() => this.props.onContactClick(contact)}
          onClick={() => {console.log('From contact list');}}
        />)}
      </ul>
    );
  }
}

ContactList.propTypes = {
  onContactClick: PropTypes.func.isRequired,

  contacts: PropTypes.array.isRequired
}
