import React, {Component} from 'react';
import Contact from './Contact';

class ContactList extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default ContactList;
