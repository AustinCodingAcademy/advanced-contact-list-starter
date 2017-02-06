import React from 'react';

class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      confirmDelete: false
    };
  }

  render() {
    return (
      <li className="contact">
        <div className="image-cropper">
          <img src={this.props.avatar} alt="avatar"/>
        </div>
        {this.state.confirmDelete ? <div className="contact-alert">
          <h3>Delete this contact? <span onClick={() => this.props.handleDelete(this.props.id, this.props.listName.toString().toLowerCase())}>Yes</span> / <span onClick={() => this.setState({confirmDelete: false})}>No</span></h3>
          </div> : <div className="contact-info">
            <h2>{this.props.name}</h2>
            {this.props.occupation}
          </div>
        }

        <div className="add-start" onClick={() => this.props.handleFav(this.props.id)}>
          <span className={this.props.buttonText}></span>
        </div>
        <div className="add-start" onClick={() => this.setState({confirmDelete: true})}>
          <span className="fa fa-minus-square"></span>
        </div>
      </li>
    );
  }
}

export default Contact;
