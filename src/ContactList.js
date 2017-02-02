import React from 'react';
import Contact from './Contact';

const ContactList = (props) => {

  return (
    <section>
      <h2>{props.title}</h2>
      <ul className="contact-list">
        {props.contacts.map(contact => {
          return (
            <Contact
              value={props.value}
              id={contact._id}
              key={contact._id}
              name={contact.name}
              avatar={contact.avatar}
              occupation={contact.occupation}
              handleSelectContactClick={props.handleSelectContactClick}
                />
          );
        })}
      </ul>
    </section>

  );

};

ContactList.propTypes = {
  title: React.PropTypes.string,
  contacts: React.PropTypes.array,
  value: React.PropTypes.string,
  handleSelectContactClick: React.PropTypes.func
};

export default ContactList;
