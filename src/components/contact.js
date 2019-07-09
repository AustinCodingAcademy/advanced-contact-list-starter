import React from 'react';
import Text from './text.js';
import Button from './button.js';

const divStyle = {
  color: 'red',
};

const divStyle2 = {

};



export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  text1 = () => {
    return this.props.name.slice(0,this.pos);
  };

  text2 = () => {
    return this.props.name.slice(this.pos,this.pos2);
  };

  text3 = () => {
    return this.props.name.slice(this.pos2);
  };

  handleClick(event) {
    event.preventDefault();
    this.props.onDeleteContact(this.props._id);
  }

  handleSelect() {
    this.props.handleSelect(this.props._id);
  }

  render() {

    this.name = this.props.name.toLowerCase();
    this.searchValue = this.props.searchValue.toLowerCase().trim();
    this.pos = this.name.search(this.searchValue);
    this.pos2 = this.pos + this.props.searchValue.trim().length;

    return (
      <div>
        <li className="contact">
          <div onClick={this.handleSelect.bind(this)} >
            <div className="image-cropper">
              <img src={this.props.avatar} alt="avatar" />
            </div>
            <div className="contact-info">

              <h2><span>
                <Text divStyle={divStyle2} text={this.text1()} />
                <Text divStyle={divStyle} text={this.text2()} />
                <Text divStyle={divStyle2} text={this.text3()} />
              </span>
              </h2>
              {this.props.occupation}
            </div>
          </div>
        </li>
        <Button onClick={this.handleClick.bind(this)} buttonText={'Delete'} />
      </div>
    );
  }

}



Contact.propTypes = {
  handleSelect: React.PropTypes.func,
  searchValue: React.PropTypes.string,
  avatar: React.PropTypes.string,
  name: React.PropTypes.string,
  occupation: React.PropTypes.string,
  _id: React.PropTypes.number,
  onDeleteContact: React.PropTypes.func
};
