import React, { Component } from 'react';

//ok, so we're creating a react component constructor that sets a state with keys name, avatar and occupation and values set to empty strings
class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      avatar: '',
      occupation: '',
    }
  }

//we create a handler method that will use this.setState to rerender our name value if it changes, and we do this for avatar and occupation as well
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

//we create a submission handler method that runs preventDefault on the click (or whatever event re: this component)
//we assign our 3 state properties to this.state
//upon submission we pass the 3 properties
  handleSubmit(event) {
    event.preventDefault();
    const { name, avatar, occupation } = this.state;
    this.props.onSubmit({ name, avatar, occupation });
  }

//render method
  render() {
    return (

      //first we will render a form with an onSubmit listener, we bind this to the constructor and run handle submit
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
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="text"
          name="avatar"
          value={this.state.avatar}
          onChange={this.handleAvatarChange.bind(this)}
        />
        <input
          type="submit"
          value="+ Add New"
          disabled={
            !this.state.name.trim() ||
            !this.state.occupation.trim() ||
            !this.state.avatar.trim()
          }
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
export default ContactForm;
