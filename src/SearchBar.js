/* eslint max-len: ["error", 1000]*/
<<<<<<< HEAD
/* UPDATED: up to Chapter 3 */
=======
>>>>>>> 6261b595b54621a4e34f16c376439a22b1238abd

import React, { Component } from 'react';

export default class SearchBar extends Component {
<<<<<<< HEAD
    render() {
        return ( <
            input className = "search-bar"
            type = "text"
            value = { this.props.value }
            onChange = { event => this.props.onChange(event) }
            />
        );
    }
}

/* Following code makes your propTypes work! */
SearchBar.propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};
=======
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
        className="search-bar"
        type="text"
        value={this.state.value}
        onChange={(event) => this.hangleChange(event)}
      />
    );
  }
}
>>>>>>> 6261b595b54621a4e34f16c376439a22b1238abd
