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
      <div onClick={() => this.props.onChange(this.state.AddedContacts)}>
        <ul className="contact-list">
          {this.props.contacts.map(contact => {
            return (
              <Contact
                key={contact._id}
                name={contact.name}
                avatar={contact.avatar}
                occupation={contact.occupation}
                active={contact.active}
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
                <div className="added-item" key={name}>
                  <p>{name}</p>
                </div>
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
  onChange: PropTypes.func
};
