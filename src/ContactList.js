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
                active={contact.active}
                buttonType={contact.buttonType}
                onButtonClick={() => this.props.onContactClick(contact._id)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ContactList;

ContactList.proptypes = {
  contacts: PropTypes.object,
  onChange: PropTypes.func,
  onContactClick: PropTypes.func,
  search: PropTypes.string,
  map: PropTypes.func
};
