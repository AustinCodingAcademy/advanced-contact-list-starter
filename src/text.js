import React from 'react';

export default class Text extends React.Component {

  render() {
    return (
      <span style={this.props.divStyle}>
        {this.props.text}
      </span>
    );
  }
}
