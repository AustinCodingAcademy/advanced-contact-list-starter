import React from 'react';
import Contact from './contact.js';

export default class ContactList extends React.Component {
  render() {
    const contacts = this.props.data;

    return (
      <ul className="contact-list">
        {contacts.map((contact,i) => {
          return (
            <Contact {...contact} handleSelect={this.props.handleSelect} key={i} searchValue={this.props.searchValue} />
          );
        })
        }
      </ul>
    );
  }
}

ContactList.propTypes = {
  data: React.PropTypes.array,
  name: React.PropTypes.string,
  occupation: React.PropTypes.string,
  handleSelect: React.PropTypes.isfunc
};
