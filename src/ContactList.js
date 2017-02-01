import React, { Component, PropTypes } from 'react';
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
                active={contact.active}
                onButtonClick={() => this.props.onContactClick(contact._id)}
              />
            );
          })}
        </ul>
      </div>

    );
  }

  // reset() {
  //   this.setState({
  //     AddedContacts: [ 'no contacts' ]
  //   });
  //   for (let i = 0; i < this.props.contacts.length; i++) {
  //     console.log(this.props.contacts[i].active);
  //   }
  // }
  //
  // AddContact(name) {
  //   const Added = this.state.AddedContacts;
  //   if (Added.includes('no contacts')) {
  //     Added[0] = name;
  //   } else if (!Added.includes(name)) {
  //     Added.push(name);
  //   }
  //   this.setState({
  //     AddedContacts: Added
  //   });
  // }

}

export default ContactList;

ContactList.proptypes = {
  contacts: PropTypes.object,
  onChange: PropTypes.func,
  onContactClick: PropTypes.func
};
