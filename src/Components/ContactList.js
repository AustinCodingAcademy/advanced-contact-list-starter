import React from 'react';
import Contact from './Contact';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, pink50, transparent} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
    >
    <MoreVertIcon color={grey400} />
  </IconButton>
);


const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const paperStyle = {
  textAlign: 'center',
  margin: 20
};

const ContactList = props => {

  return (
    <Paper style={paperStyle}>
      <TextField
          hintText="Search Contacts"
      />
      <Divider />

      <h4>Selected</h4>
      <List>
        {props.contacts.filter(contact => contact.selected).map(contact => {
          return (
            <ListItem
              value={props.value}
              key={contact._id}
              id={contact._id}
              primaryText={contact.name}
              leftAvatar={<Avatar src={contact.avatar} />}
              secondaryText={contact.occupation}
              rightIconButton={rightIconMenu} />
          );
        })}
      </List>
      <Divider />
      <h4>Available</h4>
      <List>
        {props.contacts.filter(contact => contact.selected).map(contact => {
          return (
            <ListItem
              value={props.value}
              key={contact._id}
              id={contact._id}
              primaryText={contact.name}
              leftAvatar={<Avatar src={contact.avatar} />}
              secondaryText={contact.occupation}
              rightIconButton={rightIconMenu} />
          );
        })}
      </List>
    </Paper>
  );

};

ContactList.propTypes = {
  title: React.PropTypes.string.isRequired,
  contacts: React.PropTypes.array.isRequired,
  activeContactId: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  handleSelectContactClick: React.PropTypes.func.isRequired,
  handleDeleteContactClick: React.PropTypes.func.isRequired
};

export default ContactList;
