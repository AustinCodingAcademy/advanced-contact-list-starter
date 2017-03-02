import React, {Component, PropTypes} from 'react';

export default class SearchBar extends Component {
  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <div>

        {this.props.errorMessage}
        <input
          className="search-bar"
          type="text"
          value={this.props.value}
          onChange={event => this.handleChange(event)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  value: PropTypes.string
};
