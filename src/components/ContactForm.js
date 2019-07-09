import React from 'react';

class ContactForm extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      picture: '',
      occupation: ''
    };
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

  handlePictureChange(event) {
    this.setState({
      picture: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, picture, occupation } = this.state;
    this.props.onSubmit({ name, picture, occupation });
  }

  render() {
    return (
      <form className="new-contact-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange.bind(this)}
        />

        <label htmlFor="occupation">Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleOccupationChange.bind(this)}
        />

        <label htmlFor="picture">Picture:</label>
        <input
          type="text"
          name="picture (url)"
          value={this.state.picture}
          onChange={this.handlePictureChange.bind(this)}
        />

        <input
          type="submit"
          value="+ Add New"
          disabled={!this.state.name.trim() || !this.state.occupation.trim() || !this.state.picture.trim()}
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func
};

export default ContactForm;
