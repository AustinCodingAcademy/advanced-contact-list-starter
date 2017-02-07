import React, {Component, PropTypes} from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this._initialState = {
      name: '',
      occupation: '',
      avatar: ''
    };

    this.state = this._initialState;
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {name, occupation, avatar} = this.state;
    this.props.onSubmit({name, occupation, avatar});

    this.setState(this._initialState);
  }

  render() {
    return (
      <form
        className="new-contact-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
        />
        <label htmlFor="occupation">Occupation: </label>
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleInputChange.bind(this)}
        />
        <label htmlFor="avatar">Avatar URL: </label>
        <input
          type="text"
          name="avatar"
          value={this.state.avatar}
          onChange={this.handleInputChange.bind(this)}
        />
        <input
          type="submit"
          name="submit-new-contact"
          value="Submit New Contact"
          disabled={
            !this.state.name.trim() || !this.state.occupation.trim() || !this.state.avatar.trim()
          }
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
