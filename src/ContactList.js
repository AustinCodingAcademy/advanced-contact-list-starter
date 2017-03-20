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
                search={this.props.search}
                name={contact.name}
                avatar={contact.avatar}
                occupation={contact.occupation}
                onButtonClick={() => this.props.onContactClick(contact)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array,
  onChange: PropTypes.func,
  onContactClick: PropTypes.func,
  search: PropTypes.string,
  map: PropTypes.func
};
