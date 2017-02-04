import React, {Component, PropTypes} from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('Submit', this.state);
    this.props.onSubmit(this.state);
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

        <input
          type="submit"
          value="+ Add New"
          disabled={!this.state.name.trim()}
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
