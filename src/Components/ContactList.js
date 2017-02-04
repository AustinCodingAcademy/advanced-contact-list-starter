import React from 'react';
import Contact from './Contact';

const ContactList = props => {

  return (
    <section>
      <h2>{props.title}</h2>
      <ul className="contact-list">
        {props.contacts.map((contact) => {
          return (
            <Contact
              value={props.value}
              id={contact._id}
              key={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
              isActive={props.activeContactId === contact._id}
              handleSelectContactClick={() => props.handleSelectContactClick(contact)}
              handleDeleteContactClick={() => props.handleDeleteContactClick(contact._id,
                  props.title)}
                />
          );
        })}
      </ul>
    </section>

  );

};

ContactList.propTypes = {
  title: React.PropTypes.string.isRequired,
  contacts: React.PropTypes.array.isRequired,
  activeContactId: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  handleSelectContactClick: React.PropTypes.func.isRequired,
  handleDeleteContactClick: React.PropTypes.func.isRequired
};

export default ContactList;
