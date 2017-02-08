/**
 * Created by brianmichael on 2/7/17.
 */

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import AlertError from 'material-ui/svg-icons/alert/error';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import ResetIcon from 'material-ui/svg-icons/action/autorenew';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';



const ActionAndErrorList = (props) => {

  function getIcon(iconType) {
    switch (iconType) {
      case 'add':
        return (<AddIcon />);
      case 'remove':
        return (<RemoveIcon />);
      case 'reset':
        return (<ResetIcon />);
      default:
        return (<AddIcon />);
    }
  }

  return (
    <section className="action-and-error-list">
      <FlatButton
        onClick={() => props.handleResetClick()}
        className="reset-button"
        label="Reset"
        secondary />
      <Divider />
      <List>
        {props.actionHistory.map((action) => {
          return (<ListItem
            key={action._id}
            primaryText={<span
              className="action-history-description-text">{action.description}</span>}
            leftIcon={getIcon(action.iconType)} />);
        })}
      </List>
      <Divider />
      <List>
        {props.errorHistory.map((error) => {
          return (
            <ListItem
              key={error._id}
              primaryText={
                <span className="action-history-description-text">{error.message}</span>}
              leftIcon={<AlertError />} />
          );
        })}
      </List>
    </section>
  );
};


ActionAndErrorList.propTypes = {
  handleResetClick: React.PropTypes.func.isRequired,
  actionHistory: React.PropTypes.array.isRequired,
  errorHistory: React.PropTypes.array.isRequired
};

export default ActionAndErrorList;
