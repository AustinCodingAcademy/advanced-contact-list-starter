/**
 * Created by brianmichael on 2/7/17.
 */
import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';

import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Highlighter from './Highlighter';


export default class ContactCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getIconButtonElement() {
    return (
      <IconButton
        touch
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );
  }

  getRightIconButton(props, contact) {

    if (contact.selected === true) {
      return (
        <IconMenu className="contact-card-menu" iconButtonElement={this.getIconButtonElement()}>
          <MenuItem onClick={() => this.props.handleRemoveSelectedClick(contact)}>
              Unselect</MenuItem>
          <MenuItem onClick={() => this.props.handleDeleteContactClick(contact._id)}>
              Delete</MenuItem>
        </IconMenu>
      );
    }
    return (
      <IconMenu className="contact-card-menu" iconButtonElement={this.getIconButtonElement()}>
        <MenuItem onClick={() => this.props.handleSelectContactClick(contact)}>
            Select</MenuItem>
        <MenuItem onClick={() => this.props.handleDeleteContactClick(contact._id)}>
            Delete</MenuItem>
      </IconMenu>
    );
  }

  // TODO: ask IVO about how to do this functionally,
  // IE be able to get the right function for OnClick and just return it
  // TODO: instead of the whole JSX div.

  getCardHeader() {
    if (this.props.contact.selected === true) {
      return (
        <div className="contact-card-clickable"
          onClick={() => this.props.handleRemoveSelectedClick(this.props.contact)}
          >
          <CardHeader
            title={<Highlighter
              searchWords={this.props.searchWords}
              textToHighlight={this.props.contact.name} />}
            subtitle={this.props.contact.occupation}
            avatar={this.props.contact.avatar}
            />
        </div>
      );
    }

    return (
      <div className="contact-card-clickable"
        onClick={() => this.props.handleSelectContactClick(this.props.contact)}
        >
        <CardHeader
          title={
            <Highlighter
              searchWords={this.props.searchWords}
              textToHighlight={this.props.contact.name} />
          }
          subtitle={this.props.contact.occupation}
          avatar={this.props.contact.avatar}
        />
      </div>
    );

  }

  render() {
    return (
      <Card className={this.props.contact._id === this.props.activeContactId ?
          'contact-card active' : 'contact-card'}>

        {this.getCardHeader()};

        <IconMenu className="contact-card-menu" iconButtonElement={this.getIconButtonElement()}>
          <MenuItem onClick={() => this.props.handleDeleteContactClick(this.props.contact._id)}>
            Delete</MenuItem>
        </IconMenu>
      </Card>
    );
  }
}

ContactCard.propTypes = {
  activeContactId: React.PropTypes.string.isRequired,
  searchWords: React.PropTypes.string.isRequired,
  contact: React.PropTypes.object.isRequired,
  handleSelectContactClick: React.PropTypes.func.isRequired,
  handleDeleteContactClick: React.PropTypes.func.isRequired,
  handleRemoveSelectedClick: React.PropTypes.func.isRequired,
};
