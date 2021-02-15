import React from 'react';

export default class Button extends React.Component {
  render() {

    return (
      <button onClick={this.props.resetSelection}>
        Reset
    </button>

    );
  }
}

Button.propTypes = {
  resetSelection: React.PropTypes.isfunc,
};
