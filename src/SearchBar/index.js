import React, { Component, PropTypes } from 'react';



export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={this.state.value}
        onChange={event => this.handleChange(event)}
      />
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func
};
