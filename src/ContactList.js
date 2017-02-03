import React, { Component, PropTypes } from 'react';
import Contact from './Contact';


export default class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
        {this.props.contacts.map( contact => {
          return (
            <Contact
              key={contact._id}
              name={contact.name}
              occupation={contact.occupation}
              avatar={contact.avatar}
              onSelectClick={() => this.props.onSelectContact(contact)}
              onRemoveClick={() => this.props.onRemoveContact(contact._id)}
            />
          );
        })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onSelectContact: PropTypes.func.isRequired,
  onRemoveContact: PropTypes.func.isRequired
};
