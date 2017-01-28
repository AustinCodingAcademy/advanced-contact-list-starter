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
            />
          );
        })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.func,
};
