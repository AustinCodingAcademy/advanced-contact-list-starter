import React, { PropTypes, Component } from 'react';

class ActionHist extends Component {
  render() {
    return (
      <div>
        <ul className="contact-list">
          {this.props.actionHistory.map(action => {
            return (
              <li key={action._id}>
                {action.item}
                <button onClick={() => this.props.onBtnClick(action._id)}>remove</button>
              </li>
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
  noBtnClick: PropTypes.func
};
