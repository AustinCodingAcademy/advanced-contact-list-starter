import React, { Component, PropTypes } from 'react';

class Action extends Component {
  render() {
    return (
      <li className="action">
        {this.props.action.actionMessage}
        <div className="ex-button" onClick={() => this.props.onRemove(this.props.action._id)}>x</div>
      </li>
    );
  }
}

export default Action;

Action.propTypes = {
  action: PropTypes.object.isRequired
};
