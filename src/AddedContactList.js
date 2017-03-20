import React, { Component, PropTypes } from 'react';
import AddedContact from './AddedContact';

class AddedContactList extends Component {
  render() {
    return (
      <div>
        <ul className="contact-list">
          {this.props.contacts.map(contact => {
            return (
              <AddedContact
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

export default AddedContactList;

AddedContactList.propTypes = {
  contacts: PropTypes.array,
  onChange: PropTypes.func,
  onContactClick: PropTypes.func,
  search: PropTypes.string,
  map: PropTypes.func
};
