/* eslint max-len: ["error", 1000]*/
/* UPDATED: up to Chatper 3 */

import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <input
        className="search-bar"
        type="text"
        value={this.props.value}
        onChange={event => this.props.onChange(event)}
      />
    );
  }
}

/* Following code makes your propTypes work! */
SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};
