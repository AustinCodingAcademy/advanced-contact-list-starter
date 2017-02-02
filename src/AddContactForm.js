/**
 * Created by brianmichael on 2/2/17.
 */

import React, {Component} from 'react';

class AddContactForm extends Component {

  render() {
    console.log(this.refs);

    return (
      <section>
        <h3>Add a new Contact</h3>
        <form onSubmit={(evt) => this.props.handleAddContactSubmit(evt)}>
          <input
            placeholder="Name"
            name="name"
            value={this.props.contact.name}
            onChange={(evt) => this.props.onNameChange(evt)}
            />
          <input
            placeholder="Occupation"
            name="occupation"
            value={this.props.contact.occupation}
            onChange={(evt) => this.props.onNameChange(evt)}
          />
          <input
            placeholder="Avatar Link"
            name="avatar"
            value={this.props.contact.avatar}
            onChange={(evt) => this.props.onNameChange(evt)}
          />
          <input type="submit" />
        </form>
      </section>
    );
  }
}

AddContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  handleAddContactSubmit: React.PropTypes.func.isRequired,
  onNameChange: React.PropTypes.func.isRequired
};

export default AddContactForm;
