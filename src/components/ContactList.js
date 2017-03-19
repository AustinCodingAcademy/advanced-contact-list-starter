/* eslint-disable max-len */
/* eslint-disable no-console */

import React, {Component, PropTypes} from 'react';
import Contact from './Contact';

export default class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
        {this.props.contacts.map((contact) => <Contact
          key={contact._id}
          name={contact.name}
          avatar={contact.avatar}
          occupation={contact.occupation}
          onDeleteContact={this.handleDeleteContact.bind(this)}
          onContactClick={() => this.props.onContactClick(contact)}
          onClick={() => {console.log('From contact list');}}
        />)}
      </ul>
    );
  }
}

ContactList.propTypes = {
  onContactClick: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
};
