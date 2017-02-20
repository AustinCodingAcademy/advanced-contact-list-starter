import React, {Component, PropTypes} from 'react';
import ReactTimeout from 'react-timeout';
// import axios from 'axios';

class ActionHistoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expirationTimer: 60,
      expirationInterval: ''
    };
  }

  componentDidMount() {
    // const actionItemText = this.props.itemText;
    //
    // axios.post('http://localhost:3001/actionhistory', actionItemText)
    //   .then(resp => {
    //     console.log(resp);
    //   })
    //   .catch(err => console.log(err));

    setTimeout(
      () => {
        this.props.removeHistoryItem(this.props._id);
      }, 60000);

    const expirationInterval = setInterval(() => {
      const newExpirationTimer = this.state.expirationTimer - 1;
      console.log(newExpirationTimer);

      this.setState({
        expirationTimer: newExpirationTimer,
        expirationInterval
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.expirationInterval);
  }


  render() {
    return (
      <li>
        {this.props.itemText}
        <button onClick={() => this.props.removeHistoryItem(this.props._id)}>
          &times;
        </button>
        <br /><small>Expires in: {this.state.expirationTimer} seconds</small>
      </li>
    );
  }
}

ActionHistoryItem.propTypes = {
  itemText: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  removeHistoryItem: PropTypes.func.isRequired
};

export default ReactTimeout(ActionHistoryItem);
