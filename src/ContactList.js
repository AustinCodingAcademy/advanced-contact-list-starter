import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {

  render() {

    return (
      <section>
        <h2>{this.props.title}</h2>
        <ul className="contact-list">
          {this.props.contacts.map(contact => {
            return (
              <Contact
                value={this.props.value}
                id={contact._id}
                key={contact._id}
                name={contact.name}
                avatar={contact.avatar}
                occupation={contact.occupation}
                handleSelectContactClick={this.props.handleSelectContactClick}
                        />
            );
          })}
        </ul>
      </section>

    );
  }
}

ContactList.propTypes = {
  title: React.PropTypes.string,
  contacts: React.PropTypes.object,
  value: React.PropTypes.string,
  handleSelectContactClick: React.PropTypes.function
};

export default ContactList;
