import React from 'react';

class ContactForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      avatar: '',
      occupation: ''
    }
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleOccupationChange(event) {
    this.setState({
      occupation: event.target.value
    });
  }

  handleAvatarChange(event) {
    this.setState({
      avatar: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, avatar, occupation } = this.state;
    this.props.onSubmit({ name, avatar, occupation }, 'contacts');

    this.setState({
        name: '',
        avatar: '',
        occupation: ''
    });
  }

  render() {
    return (
      <div id="form-container">
      <span className="fa fa-remove" onClick={() => this.props.hideForm()}></span>
      <form className="new-contact-form" onSubmit={this.handleSubmit.bind(this)}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleNameChange.bind(this)}
        />

        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={this.state.occupation}
          onChange={this.handleOccupationChange.bind(this)}
        />

        <input
          type="text"
          name="avatar"
          placeholder="Avatar (link)"
          value={this.state.avatar}
          onChange={this.handleAvatarChange.bind(this)}
        />

        <input
          type="submit"
          value="+ Add New"
          disabled={!this.state.name.trim() || !this.state.occupation.trim() || !this.state.avatar.trim()}
        />
      </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default ContactForm;
