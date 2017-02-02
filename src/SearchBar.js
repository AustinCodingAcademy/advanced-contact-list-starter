import React from 'react';

/* eslint max-len: [1, {"ignoreUrls": true}] */

const SearchBar = props => {


  //   this.state = {
  //     value: ''
  //   };
  // }
  //
  // handleChange(event)
  //   this.setState({
  //     value: event.target.value
  //   });
  //
  //   if (this.props.onChange) {
  //     this.props.onChange(event.target.value);
  //   }
  // }


  return (
    <input
      className="search-bar"
      type="text"
      value={props.value}
      onChange={event => props.onChange(event)}
      />
  );
};


SearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchBar;
