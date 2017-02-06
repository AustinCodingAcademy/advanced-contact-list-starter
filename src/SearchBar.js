import React from 'react';

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
        <input
          className='search-bar'
          type="text"
          placeholder="Search"
          value={this.props.value}
          onChange={event => this.props.onChange(event)}
          />
    );
  }
}

SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchBar;
