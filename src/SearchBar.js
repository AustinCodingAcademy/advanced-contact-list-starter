import React, { Component } from 'react';

class SearchBar extends Component {
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
    if(this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <input
        className="search-bar"
        type="text"
        value={this.state.value}
        onChange={ (event) => this.onChange(event) }
      />
    );
  }
}
searchBar.propTypes ={
  //
  onChange={event => this.handleChange(event)}
}

export default SearchBar;
