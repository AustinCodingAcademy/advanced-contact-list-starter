import React, { Component, PropTypes } from 'react';
import Contact from './Contact';

class ContactList extends Component {
  constructor() {
    super();
    this.state = {
      AddedContacts: [ 'no contacts' ]
    };
  }
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
                onChange={this.AddContact.bind(this)}
              />
            );
          })}
        </ul>
        <div>
          <h2>Added Contacts</h2>
          <div>
            {this.state.AddedContacts.map(name => {
              return (
                <div key={name}>{name}</div>
              );
            })}
          </div>
        </div>
      </div>

    );
  }

  AddContact(name) {
    const Added = this.state.AddedContacts;
    if (Added.includes('no contacts')) {
      Added[0] = name;
    } else if (!Added.includes(name)) {
      Added.push(name);
    }
    this.setState({
      AddedContacts: Added
    });
  }

}

export default ContactList;

ContactList.proptypes = {
  contacts: PropTypes.object,
};
