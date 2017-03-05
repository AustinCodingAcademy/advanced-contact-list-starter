import React, { Component, PropTypes } from 'react';
import Contact from './Contact';

export default class ContactList extends Component {
  render() {
    return (
      <ul className="contact-list">
        {this.props.contacts.map(contact => {
          return (
            <Contact
              key={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
            />
          );
        })}
      </ul>
    );
  }
}


/* Following code makes your propTypes work! */
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};
