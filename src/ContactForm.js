import React, {Component, PropTypes} from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      occupation: '',
      avatar: ''
    };
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // handleNameChange(event) {
  //   this.setState({
  //     name: event.target.value
  //   });
  // }
  //
  // handleOccupationChange(event) {
  //   this.setState({
  //     occupation: event.target.value
  //   });
  // }
  //
  // handleAvatarChange(event) {
  //   this.setState({
  //     avatar: event.target.value
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();

    const { name, occupation, avatar } = this.state;
    this.props.onSubmit({name, occupation, avatar});
    this.setState({
      name: '',
      occupation: '',
      avatar: ''
    });
  }

  render() {
    return (
      <div className="freeze-window" onClick={() => {this.props.onEscape();}}>
        <form className="new-contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          onClick={event => event.stopPropagation()}
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)}
            autoFocus
          />

          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={this.state.occupation}
            onChange={this.handleInputChange.bind(this)}
          />

          <label htmlFor="avatar">Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={this.state.avatar}
            onChange={this.handleInputChange.bind(this)}
          />

          <input
            type="submit"
            value="+ Add New"
            disabled={!this.state.name.trim() ||
              !this.state.occupation.trim() ||
              !this.state.avatar.trim()}
          />
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired
};
