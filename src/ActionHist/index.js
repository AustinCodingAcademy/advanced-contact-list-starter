import React, { PropTypes, Component } from 'react';

class ActionHist extends Component {
  render() {
    return (
      <div>
        <ul className="contact-list">
          {this.props.actionHistory.map(action => {
            return (
              <li key={Math.random()}>{action.item}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ActionHist;

ActionHist.propTypes = {
  actionHistory: PropTypes.array,
};
